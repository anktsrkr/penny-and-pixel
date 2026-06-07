import { DndContext, DragEndEvent, PointerSensor, closestCenter, useDraggable, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AudioButton } from "../components/controls";
import { CoinVisual, ConfettiBurst, Mascot } from "../components/visuals";
import { coins, getGame } from "../data/games";
import { speak } from "../lib/audio";
import { useProgressStore } from "../store/progressStore";
import type { CoinName, Direction, GameDefinition, LevelDefinition } from "../types";

export function LevelPlayer() {
  const { gameId } = useParams();
  const game = getGame(gameId);
  const [levelIndex, setLevelIndex] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const completeLevel = useProgressStore((state) => state.completeLevel);
  const completedLevels = useProgressStore((state) => state.progress.completedLevels);
  const settings = useProgressStore((state) => state.progress.parentSettings);

  useEffect(() => {
    setLevelIndex(0);
  }, [gameId]);

  if (!game) {
    return (
      <section className="not-found">
        <h1>Adventure not found</h1>
        <Link className="primary-action" to="/adventures">
          Pick another adventure
        </Link>
      </section>
    );
  }

  const selectedGame = game;
  const locked = (game.world === "money" && !settings.moneyUnlocked) || (game.world === "code" && !settings.codeUnlocked);
  if (locked) {
    return (
      <section className="not-found">
        <Mascot type={game.mascot} />
        <h1>{game.title} is resting</h1>
        <p className="page-note">Ask a parent to unlock this world.</p>
        <Link className="primary-action" to="/parent">
          Parent area
        </Link>
      </section>
    );
  }

  const level = game.levels[levelIndex];
  const alreadyDone = completedLevels[game.id]?.includes(level.id) ?? false;

  function finishLevel() {
    completeLevel(selectedGame.id, level.id, level.stars);
    setCelebrating(true);
    speak({ id: "level-done", text: `Great job. You earned ${level.stars} stars.`, tone: "success" });
    window.setTimeout(() => setCelebrating(false), 1300);
  }

  return (
    <section className="level-page">
      <ConfettiBurst show={celebrating} />
      <div className="level-header">
        <Link to="/adventures" className="small-link">
          Adventures
        </Link>
        <div>
          <p className="eyebrow">{game.world} world</p>
          <h1>{game.title}</h1>
          <p>{game.goal}</p>
        </div>
        <Mascot type={game.mascot} mood={alreadyDone ? "proud" : "happy"} />
      </div>

      <div className="level-strip" aria-label="Level selector">
        {game.levels.map((entry, index) => (
          <AudioButton
            key={entry.id}
            className={`level-pill ${index === levelIndex ? "active" : ""} ${completedLevels[game.id]?.includes(entry.id) ? "done" : ""}`}
            cue={{ id: entry.id, text: entry.title, tone: "tap" }}
            onClick={() => setLevelIndex(index)}
          >
            {index + 1}
          </AudioButton>
        ))}
      </div>

      <div className="play-panel" style={{ borderColor: game.color }}>
        <div className="prompt-row">
          <div>
            <h2>{level.title}</h2>
            <p>{level.narrator}</p>
          </div>
          <AudioButton className="round-button dark" cue={{ id: `hear-${level.id}`, text: level.narrator, tone: "tap" }} aria-label="Hear instructions">
            <Check aria-hidden="true" />
          </AudioButton>
        </div>
        <GameSurface key={level.id} game={game} level={level} onComplete={finishLevel} alreadyDone={alreadyDone} />
      </div>
    </section>
  );
}

function GameSurface({ game, level, onComplete, alreadyDone }: { game: GameDefinition; level: LevelDefinition; onComplete: () => void; alreadyDone: boolean }) {
  if (game.id === "coin-catcher") {
    return <CoinCatcher level={level} onComplete={onComplete} alreadyDone={alreadyDone} />;
  }
  if (game.id === "piggy-bank") {
    return <PiggyBank level={level} onComplete={onComplete} alreadyDone={alreadyDone} />;
  }
  if (game.id === "count-match") {
    return <CountMatch level={level} onComplete={onComplete} alreadyDone={alreadyDone} />;
  }
  if (game.id === "step-shuffle") {
    return <StepShuffle level={level} onComplete={onComplete} alreadyDone={alreadyDone} />;
  }
  return <MoveBot level={level} onComplete={onComplete} alreadyDone={alreadyDone} />;
}

function CompleteMessage({ alreadyDone }: { alreadyDone: boolean }) {
  return <p className="success-note">{alreadyDone ? "Already in your stamp trail." : "Nice work. Stars added."}</p>;
}

function CoinCatcher({ level, onComplete, alreadyDone }: GameProps) {
  const [done, setDone] = useState(alreadyDone);
  const target = level.targetCoin ?? "penny";
  const options = Object.keys(coins) as CoinName[];

  function choose(name: CoinName) {
    if (name === target) {
      setDone(true);
      if (!done) {
        onComplete();
      }
    } else {
      speak({ id: "coin-hint", text: `Try again. Listen for ${coins[target].label}.`, tone: "hint" });
    }
  }

  return (
    <div className="coin-game">
      <div className="falling-zone">
        <CoinVisual name={target} />
      </div>
      <div className="choice-grid">
        {options.map((name) => (
          <AudioButton
            key={name}
            className="coin-choice"
            cue={{ id: `coin-${name}`, text: coins[name].label, tone: "tap" }}
            onClick={() => choose(name)}
          >
            <CoinVisual name={name} />
            <span>{coins[name].label}</span>
          </AudioButton>
        ))}
      </div>
      {done ? <CompleteMessage alreadyDone={alreadyDone} /> : null}
    </div>
  );
}

function PiggyBank({ level, onComplete, alreadyDone }: GameProps) {
  const count = level.targetCount ?? 3;
  const [saved, setSaved] = useState<string[]>([]);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  const done = saved.length >= count || alreadyDone;

  function onDragEnd(event: DragEndEvent) {
    if (event.over?.id === "bank" && !saved.includes(String(event.active.id))) {
      const next = [...saved, String(event.active.id)];
      setSaved(next);
      speak({ id: "save-coin", text: "Saved.", tone: "tap" });
      if (next.length >= count && !done) {
        onComplete();
      }
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <PiggyBankInner count={count} saved={saved} done={done} alreadyDone={alreadyDone} />
    </DndContext>
  );
}

function PiggyBankInner({ count, saved, done, alreadyDone }: { count: number; saved: string[]; done: boolean; alreadyDone: boolean }) {
  const { setNodeRef, isOver } = useDroppable({ id: "bank" });
  return (
    <div className="piggy-game">
      <div className="coin-bank-row">
        {Array.from({ length: count }).map((_, index) => {
          const id = `coin-${index}`;
          return saved.includes(id) ? null : <DraggableCoin key={id} id={id} name={index % 2 === 0 ? "penny" : "nickel"} />;
        })}
      </div>
      <div ref={setNodeRef} className={`bank-drop ${isOver ? "over" : ""}`}>
        <Mascot type="penny" mood={done ? "proud" : "happy"} />
        <strong>
          {saved.length}/{count}
        </strong>
        <span>saved</span>
      </div>
      {done ? <CompleteMessage alreadyDone={alreadyDone} /> : null}
    </div>
  );
}

function DraggableCoin({ id, name }: { id: string; name: CoinName }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  return (
    <button
      ref={setNodeRef}
      className="draggable-coin"
      style={{ transform: CSS.Translate.toString(transform) }}
      {...listeners}
      {...attributes}
      type="button"
    >
      <CoinVisual name={name} />
    </button>
  );
}

function CountMatch({ level, onComplete, alreadyDone }: GameProps) {
  const target = level.targetCount ?? 3;
  const [done, setDone] = useState(alreadyDone);

  function choose(count: number) {
    if (count === target) {
      setDone(true);
      if (!done) {
        onComplete();
      }
    } else {
      speak({ id: "count-hint", text: "Try counting each coin one at a time.", tone: "hint" });
    }
  }

  return (
    <div className="count-game">
      <div className="count-coins">
        {Array.from({ length: target }).map((_, index) => (
          <CoinVisual key={index} name={index % 2 === 0 ? "penny" : "dime"} />
        ))}
      </div>
      <div className="number-grid">
        {[2, 3, 4, 5].map((count) => (
          <AudioButton key={count} className="number-button" cue={{ id: `number-${count}`, text: String(count), tone: "tap" }} onClick={() => choose(count)}>
            {count}
          </AudioButton>
        ))}
      </div>
      {done ? <CompleteMessage alreadyDone={alreadyDone} /> : null}
    </div>
  );
}

function StepShuffle({ level, onComplete, alreadyDone }: GameProps) {
  const initial = useMemo(() => level.shuffled ?? level.sequence ?? [], [level]);
  const [items, setItems] = useState(initial);
  const [done, setDone] = useState(alreadyDone);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  const sequence = level.sequence ?? [];

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }
    setItems((current) => {
      const oldIndex = current.indexOf(String(active.id));
      const newIndex = current.indexOf(String(over.id));
      const next = arrayMove(current, oldIndex, newIndex);
      if (next.join("|") === sequence.join("|")) {
        setDone(true);
        if (!done) {
          window.setTimeout(onComplete, 120);
        }
      }
      return next;
    });
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <div className="sequence-row">
          {items.map((item) => (
            <SortableStep key={item} id={item} />
          ))}
        </div>
      </SortableContext>
      <AudioButton
        className="child-button"
        cue={{ id: "check-order", text: done ? "That order works." : "Drag the cards until the story makes sense.", tone: done ? "success" : "hint" }}
        onClick={() => {
          if (items.join("|") === sequence.join("|")) {
            setDone(true);
            if (!done) {
              onComplete();
            }
          } else {
            speak({ id: "order-hint", text: "Try the first thing, then the next thing, then the last thing.", tone: "hint" });
          }
        }}
      >
        <Check aria-hidden="true" />
        Check
      </AudioButton>
      {done ? <CompleteMessage alreadyDone={alreadyDone} /> : null}
    </DndContext>
  );
}

function SortableStep({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  return (
    <button
      className="step-card"
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      type="button"
    >
      <span className="step-picture">{id.slice(0, 1)}</span>
      <span>{id}</span>
    </button>
  );
}

function MoveBot({ level, onComplete, alreadyDone }: GameProps) {
  const target = level.path ?? [];
  const [commands, setCommands] = useState<Direction[]>([]);
  const [done, setDone] = useState(alreadyDone);
  const finalPosition = target.reduce(movePosition, { x: 0, y: 0 });
  const botPosition = commands.reduce(movePosition, { x: 0, y: 0 });
  const directions: Direction[] = ["up", "right", "down", "left"];

  function run() {
    if (commands.join("|") === target.join("|")) {
      setDone(true);
      if (!done) {
        onComplete();
      }
    } else {
      speak({ id: "move-hint", text: "Try the arrows in the same order you hear them.", tone: "hint" });
    }
  }

  return (
    <div className="move-game">
      <div className="bot-grid" aria-label="Robot path board">
        {Array.from({ length: 9 }).map((_, index) => {
          const x = index % 3;
          const y = Math.floor(index / 3);
          const hasBot = botPosition.x === x && botPosition.y === y;
          const hasStar = finalPosition.x === x && finalPosition.y === y;
          return (
            <span key={index} className="grid-cell">
              {hasBot ? <Mascot type="pixel" /> : null}
              {hasStar ? <span className="star-token">star</span> : null}
            </span>
          );
        })}
      </div>
      <div className="command-tray" aria-label="Command sequence">
        {commands.length === 0 ? <span className="empty-sequence">Tap arrows</span> : commands.map((direction, index) => <DirectionChip key={`${direction}-${index}`} direction={direction} />)}
      </div>
      <div className="arrow-pad">
        {directions.map((direction) => (
          <AudioButton
            key={direction}
            className="arrow-button"
            cue={{ id: `arrow-${direction}`, text: direction, tone: "tap" }}
            onClick={() => setCommands((current) => (current.length < 5 ? [...current, direction] : current))}
          >
            <DirectionIcon direction={direction} />
          </AudioButton>
        ))}
      </div>
      <div className="game-actions">
        <AudioButton className="child-button" cue={{ id: "run-bot", text: "Run Pixel.", tone: "tap" }} onClick={run}>
          <Check aria-hidden="true" />
          Run
        </AudioButton>
        <AudioButton className="child-button secondary" cue={{ id: "reset-bot", text: "Start over.", tone: "tap" }} onClick={() => setCommands([])}>
          <RotateCcw aria-hidden="true" />
          Reset
        </AudioButton>
      </div>
      {done ? <CompleteMessage alreadyDone={alreadyDone} /> : null}
    </div>
  );
}

function movePosition(position: { x: number; y: number }, direction: Direction) {
  const next = { ...position };
  if (direction === "up") next.y -= 1;
  if (direction === "right") next.x += 1;
  if (direction === "down") next.y += 1;
  if (direction === "left") next.x -= 1;
  return {
    x: Math.min(2, Math.max(0, next.x)),
    y: Math.min(2, Math.max(0, next.y))
  };
}

function DirectionChip({ direction }: { direction: Direction }) {
  return (
    <span className="direction-chip">
      <DirectionIcon direction={direction} />
      {direction}
    </span>
  );
}

function DirectionIcon({ direction }: { direction: Direction }) {
  if (direction === "up") return <ArrowUp aria-hidden="true" />;
  if (direction === "right") return <ArrowRight aria-hidden="true" />;
  if (direction === "down") return <ArrowDown aria-hidden="true" />;
  return <ArrowLeft aria-hidden="true" />;
}

interface GameProps {
  level: LevelDefinition;
  onComplete: () => void;
  alreadyDone: boolean;
}
