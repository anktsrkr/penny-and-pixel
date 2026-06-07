import { ArrowRight, BookOpen, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AudioButton } from "../components/controls";
import { Mascot } from "../components/visuals";
import { getGamesForProfile } from "../data/games";
import { completionPercent } from "../lib/rewards";
import { useProgressStore } from "../store/progressStore";

export function HomeWorld() {
  const progress = useProgressStore((state) => state.progress);
  const games = getGamesForProfile(progress.parentSettings.region, progress.parentSettings.ageBand);
  const completed = completionPercent(progress, progress.parentSettings.region, progress.parentSettings.ageBand);
  const navigate = useNavigate();

  return (
    <section className="home-world">
      <div className="hero-stage">
        <div className="mascot-pair">
          <Mascot type="penny" />
          <Mascot type="pixel" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Home World</p>
          <h1>Penny & Pixel</h1>
          <p>Play tiny money and coding adventures with big buttons, happy sounds, and offline progress.</p>
          <Link className="primary-action" to="/adventures">
            <Sparkles aria-hidden="true" />
            Pick adventure
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="status-strip" aria-label="Progress summary">
        <div>
          <strong>{progress.rewards.stars}</strong>
          <span>stars</span>
        </div>
        <div>
          <strong>{progress.rewards.coins}</strong>
          <span>coins</span>
        </div>
        <div>
          <strong>{completed}%</strong>
          <span>done</span>
        </div>
      </div>

      <div className="action-grid">
        {games.slice(0, 3).map((game) => (
          <AudioButton
            key={game.id}
            className="world-tile"
            cue={{ id: `home-${game.id}`, text: game.title, tone: "tap" }}
            onClick={() => navigate(`/play/${game.id}`)}
            style={{ borderColor: game.color }}
          >
            <span className="tile-orb" style={{ background: game.color }} />
            <span>{game.shortTitle}</span>
          </AudioButton>
        ))}
      </div>

      <div className="home-links">
        <Link to="/stamp-book">
          <BookOpen aria-hidden="true" />
          Stamp book
        </Link>
        <Link to="/parent">
          <ShieldCheck aria-hidden="true" />
          Parent area
        </Link>
      </div>
    </section>
  );
}
