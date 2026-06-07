import { Lock, ShieldCheck, Volume2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { AudioButton } from "../components/controls";
import { games } from "../data/games";
import { completionPercent } from "../lib/rewards";
import { hashPin, isValidPin } from "../lib/pin";
import { useProgressStore } from "../store/progressStore";

export function ParentDashboard() {
  const progress = useProgressStore((state) => state.progress);
  const updateParentSettings = useProgressStore((state) => state.updateParentSettings);
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [challengeDone, setChallengeDone] = useState(false);
  const [message, setMessage] = useState("");
  const hasPin = Boolean(progress.parentSettings.pinHash);

  async function submitPin(event: FormEvent) {
    event.preventDefault();
    if (!challengeDone) {
      setMessage("Press the adult check button first.");
      return;
    }
    if (!isValidPin(pin)) {
      setMessage("Use exactly 4 numbers.");
      return;
    }
    const nextHash = await hashPin(pin);
    if (!hasPin) {
      updateParentSettings({ pinHash: nextHash });
      setUnlocked(true);
      setMessage("PIN saved.");
      return;
    }
    if (nextHash === progress.parentSettings.pinHash) {
      setUnlocked(true);
      setMessage("Parent area unlocked.");
    } else {
      setMessage("That PIN did not match.");
    }
  }

  if (!unlocked) {
    return (
      <section className="parent-gate">
        <div className="parent-panel">
          <Lock aria-hidden="true" />
          <p className="eyebrow">Parent Gate</p>
          <h1>{hasPin ? "Enter parent PIN" : "Create parent PIN"}</h1>
          <p className="page-note">Parent settings are separated from child play.</p>
          <div className="adult-check" aria-label="Adult check">
            <span>Adult check: press 4</span>
            {[2, 3, 4].map((number) => (
              <button
                key={number}
                className={challengeDone && number === 4 ? "selected" : ""}
                type="button"
                onClick={() => {
                  setChallengeDone(number === 4);
                  setMessage(number === 4 ? "Adult check complete." : "Try the answer to 2 plus 2.");
                }}
              >
                {number}
              </button>
            ))}
          </div>
          <form className="pin-form" onSubmit={submitPin}>
            <label htmlFor="pin">4-digit PIN</label>
            <input
              id="pin"
              inputMode="numeric"
              maxLength={4}
              pattern="[0-9]*"
              value={pin}
              onChange={(event) => setPin(event.target.value.replace(/\D/g, ""))}
            />
            <button type="submit" className="primary-action">
              <ShieldCheck aria-hidden="true" />
              {hasPin ? "Unlock" : "Save PIN"}
            </button>
          </form>
          {message ? <p className="form-message">{message}</p> : null}
        </div>
      </section>
    );
  }

  const completed = completionPercent(progress);
  const completedCount = games.reduce((sum, game) => sum + (progress.completedLevels[game.id]?.length ?? 0), 0);

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Parent Dashboard</p>
          <h1>Progress and limits</h1>
          <p className="page-note">Local-only settings and reports. No account or cloud sync.</p>
        </div>
        <div className="coin-balance">
          <strong>{completed}%</strong>
          <span>complete</span>
        </div>
      </div>

      <div className="parent-grid">
        <section className="settings-panel" aria-labelledby="progress-heading">
          <h2 id="progress-heading">Progress report</h2>
          <div className="report-row">
            <span>Levels complete</span>
            <strong>{completedCount}</strong>
          </div>
          <div className="report-row">
            <span>Stars earned</span>
            <strong>{progress.rewards.stars}</strong>
          </div>
          <div className="report-row">
            <span>Stickers collected</span>
            <strong>{progress.rewards.stickers.length}</strong>
          </div>
          <div className="report-row">
            <span>Recent sessions</span>
            <strong>{progress.sessionLog.length}</strong>
          </div>
        </section>

        <section className="settings-panel" aria-labelledby="settings-heading">
          <h2 id="settings-heading">Play settings</h2>
          <label className="range-control">
            <span>Daily play limit: {progress.parentSettings.dailyLimitMinutes} min</span>
            <input
              type="range"
              min={5}
              max={30}
              step={5}
              value={progress.parentSettings.dailyLimitMinutes}
              onChange={(event) => updateParentSettings({ dailyLimitMinutes: Number(event.target.value) })}
            />
          </label>
          <label className="toggle-row">
            <input
              type="checkbox"
              checked={progress.parentSettings.moneyUnlocked}
              onChange={(event) => updateParentSettings({ moneyUnlocked: event.target.checked })}
            />
            Money world unlocked
          </label>
          <label className="toggle-row">
            <input
              type="checkbox"
              checked={progress.parentSettings.codeUnlocked}
              onChange={(event) => updateParentSettings({ codeUnlocked: event.target.checked })}
            />
            Code world unlocked
          </label>
          <label className="toggle-row">
            <input
              type="checkbox"
              checked={progress.parentSettings.audioEnabled}
              onChange={(event) => updateParentSettings({ audioEnabled: event.target.checked })}
            />
            Audio narration enabled
          </label>
          <AudioButton
            className="child-button"
            cue={{ id: "test-audio", text: "Audio is ready for Penny and Pixel.", tone: "tap" }}
          >
            <Volume2 aria-hidden="true" />
            Test audio
          </AudioButton>
        </section>
      </div>
    </section>
  );
}
