import { Link } from "react-router-dom";
import { Mascot } from "../components/visuals";
import { games } from "../data/games";
import { speak } from "../lib/audio";
import { useProgressStore } from "../store/progressStore";

export function AdventurePicker() {
  const settings = useProgressStore((state) => state.progress.parentSettings);
  const completedLevels = useProgressStore((state) => state.progress.completedLevels);

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Pick Adventure</p>
          <h1>Choose a world</h1>
        </div>
        <div className="mini-mascots">
          <Mascot type="penny" />
          <Mascot type="pixel" />
        </div>
      </div>

      <div className="game-grid">
        {games.map((game) => {
          const locked = (game.world === "money" && !settings.moneyUnlocked) || (game.world === "code" && !settings.codeUnlocked);
          return (
            <Link
              key={game.id}
              className={`game-card ${locked ? "locked" : ""}`}
              to={locked ? "/parent" : `/play/${game.id}`}
              onClick={() =>
                speak({
                  id: `pick-${game.id}`,
                  text: locked ? `${game.title} is resting. Ask a parent.` : game.title,
                  tone: "tap"
                })
              }
              style={{ borderColor: game.color }}
            >
              <span className="world-label">{game.world}</span>
              <Mascot type={game.mascot} />
              <h2>{game.title}</h2>
              <p>{game.goal}</p>
              <div className="level-dots" aria-label={`${completedLevels[game.id]?.length ?? 0} levels complete`}>
                {game.levels.map((level) => (
                  <span key={level.id} className={completedLevels[game.id]?.includes(level.id) ? "done" : ""} />
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
