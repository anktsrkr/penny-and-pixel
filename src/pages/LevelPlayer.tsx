import { DndContext, DragEndEvent, PointerSensor, closestCenter, useDraggable, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AudioButton } from "../components/controls";
import { CoinVisual, ConfettiBurst, Mascot } from "../components/visuals";
import { getGame } from "../data/games";
import { getDenomination } from "../data/money";
import { speak } from "../lib/audio";
import { useProgressStore } from "../store/progressStore";
import type { DenominationId, Direction, GameDefinition, LevelDefinition, SortGroup } from "../types";

const arrowChoices: Direction[] = ["up", "right", "down", "left"];

export function LevelPlayer() {
  const { gameId } = useParams();
  const settings = useProgressStore((state) => state.progress.parentSettings);
  const game = getGame(gameId, settings.region);
  const [levelIndex, setLevelIndex] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const completeLevel = useProgressStore((state) => state.completeLevel);
  const completedLevels = useProgressStore((state) => state.progress.completedLevels);

  useEffect(() => {
    setLevelIndex(0);
  }, [gameId, settings.region]);

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

  const selectedGame = game;
  const level = game.levels[levelIndex] ?? game.levels[0];
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
  if (game.id === "coin-catcher") return <CoinCatcher level={level} onComplete={onComplete} alreadyDone={alreadyDone} />;
  if (game.id === "saving-pot" || game.id === "giving-jar") return <DropCoins level={level} onComplete={onComplete} alreadyDone={alreadyDone} kind={game.id} />;
  if (game.id === "count-match") return <CountMatch level={level} onComplete={onComplete} alreadyDone={alreadyDone} />;
  if (game.id === "tiny-shop") return <TinyShop level={level} onComplete={onComplete} alreadyDone={alreadyDone} />;
  if (game.id === "more-or-less") return <MoreOrLess level={level} onComplete={onComplete} alreadyDone={alreadyDone} />;
  if (game.id === "coin-sorter") return <CoinSorter level={level} onComplete={onComplete} alreadyDone={alreadyDone} />;
  if (game.id === "step-shuffle") return <StepShuffle level={level} onComplete={onComplete} alreadyDone={alreadyDone} />;
  if (game.id === "move-bot") return <MoveBot level={level} onComplete={onComplete} alreadyDone={alreadyDone} />;
  if (game.id === "repeat-pattern") return <ChoiceGame level={level} onComplete={onComplete} alreadyDone={alreadyDone} mode="pattern" />;
  if (game.id === "if-then-weather") return <ChoiceGame level={level} onComplete={onComplete} alreadyDone={alreadyDone} mode="weather" />;
  if (game.id === "bug-hunt") return <BugHunt level={level} onComplete={onComplete} alreadyDone={alreadyDone} />;
  return <ChoiceGame level={level} onComplete={onComplete} alreadyDone={alreadyDone} mode="shape" />;
}

function CompleteMessage({ alreadyDone }: { alreadyDone: boolean }) {
  return <p className="success-note">{alreadyDone ? "Already in your stamp trail." : "Nice work. Stars added."}</p>;
}

function CoinCatcher({ level, onComplete, alreadyDone }: GameProps) {
  const [done, setDone] = useState(alreadyDone);
  const target = level.targetDenomination ?? level.denominations?.[0] ?? "uk-1p";
  const options = level.denominations ?? [target];

  function choose(id: DenominationId) {
    if (id === target) {
      setDone(true);
      if (!done) onComplete();
    } else {
      speak({ id: "coin-hint", text: `Try again. Listen for ${getDenomination(target).label}.`, tone: "hint" });
    }
  }

  return (
    <div className="coin-game">
      <div className="falling-zone">
        <CoinVisual denomination={target} />
      </div>
      <div className="choice-grid">
        {options.map((id) => (
          <AudioButton key={id} className="coin-choice" cue={{ id: `coin-${id}`, text: getDenomination(id).label, tone: "tap" }} onClick={() => choose(id)}>
            <CoinVisual denomination={id} />
            <span>{getDenomination(id).shortLabel}</span>
          </AudioButton>
        ))}
      </div>
      {done ? <CompleteMessage alreadyDone={alreadyDone} /> : null}
    </div>
  );
}

function DropCoins({ level, onComplete, alreadyDone, kind }: GameProps & { kind: "saving-pot" | "giving-jar" }) {
  const count = level.targetCount ?? 3;
  const coinIds: DenominationId[] = level.denominations?.length ? level.denominations : ["uk-1p", "uk-2p", "uk-5p"];
  const [saved, setSaved] = useState<string[]>([]);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  const done = saved.length >= count || alreadyDone;

  function onDragEnd(event: DragEndEvent) {
    if (event.over?.id === "bank" && !saved.includes(String(event.active.id))) {
      const next = [...saved, String(event.active.id)];
      setSaved(next);
      speak({ id: "save-coin", text: kind === "giving-jar" ? "Shared." : "Saved.", tone: "tap" });
      if (next.length >= count && !done) onComplete();
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <DropCoinsInner count={count} saved={saved} done={done} alreadyDone={alreadyDone} coinIds={coinIds} kind={kind} />
    </DndContext>
  );
}

function DropCoinsInner({ count, saved, done, alreadyDone, coinIds, kind }: { count: number; saved: string[]; done: boolean; alreadyDone: boolean; coinIds: DenominationId[]; kind: "saving-pot" | "giving-jar" }) {
  const { setNodeRef, isOver } = useDroppable({ id: "bank" });
  return (
    <div className="piggy-game">
      <div className="coin-bank-row">
        {Array.from({ length: count }).map((_, index) => {
          const id = `coin-${index}`;
          const denomination = coinIds[index % coinIds.length];
          return saved.includes(id) ? null : <DraggableCoin key={id} id={id} denomination={denomination} />;
        })}
      </div>
      <div ref={setNodeRef} className={`bank-drop ${isOver ? "over" : ""}`}>
        <Mascot type="penny" mood={done ? "proud" : "happy"} />
        <strong>
          {saved.length}/{count}
        </strong>
        <span>{kind === "giving-jar" ? "shared" : "saved"}</span>
      </div>
      {done ? <CompleteMessage alreadyDone={alreadyDone} /> : null}
    </div>
  );
}

function DraggableCoin({ id, denomination }: { id: string; denomination: DenominationId }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  return (
    <button ref={setNodeRef} className="draggable-coin" style={{ transform: CSS.Translate.toString(transform) }} {...listeners} {...attributes} type="button">
      <CoinVisual denomination={denomination} />
    </button>
  );
}

function CountMatch({ level, onComplete, alreadyDone }: GameProps) {
  const target = level.targetCount ?? 3;
  const coinIds: DenominationId[] = level.denominations?.length ? level.denominations : ["uk-1p"];
  const [done, setDone] = useState(alreadyDone);
  const choices = Array.from(new Set([Math.max(1, target - 1), target, target + 1, target + 2])).slice(0, 4);

  function choose(count: number) {
    if (count === target) {
      setDone(true);
      if (!done) onComplete();
    } else {
      speak({ id: "count-hint", text: "Try counting each coin one at a time.", tone: "hint" });
    }
  }

  return (
    <div className="count-game">
      <div className="count-coins">
        {Array.from({ length: target }).map((_, index) => (
          <CoinVisual key={index} denomination={coinIds[index % coinIds.length]} />
        ))}
      </div>
      <div className="number-grid">
        {choices.map((count) => (
          <AudioButton key={count} className="number-button" cue={{ id: `number-${count}`, text: String(count), tone: "tap" }} onClick={() => choose(count)}>
            {count}
          </AudioButton>
        ))}
      </div>
      {done ? <CompleteMessage alreadyDone={alreadyDone} /> : null}
    </div>
  );
}

function TinyShop({ level, onComplete, alreadyDone }: GameProps) {
  const price = level.priceMinor ?? 2;
  const coinIds: DenominationId[] = level.denominations?.length ? level.denominations : ["uk-1p", "uk-2p", "uk-5p"];
  const [selected, setSelected] = useState<DenominationId[]>([]);
  const [done, setDone] = useState(alreadyDone);
  const total = selected.reduce((sum, id) => sum + getDenomination(id).valueMinor, 0);

  function buy() {
    if (total >= price) {
      setDone(true);
      if (!done) onComplete();
    } else {
      speak({ id: "shop-hint", text: "Save more first. Pick another coin.", tone: "hint" });
    }
  }

  return (
    <div className="shop-game">
      <div className="shop-counter">
        <span className="shop-item">{level.shopItem ?? "item"}</span>
        <strong>{price}p</strong>
      </div>
      <div className="choice-grid">
        {coinIds.map((id) => (
          <AudioButton key={id} className="coin-choice" cue={{ id: `shop-${id}`, text: getDenomination(id).label, tone: "tap" }} onClick={() => setSelected((current) => [...current, id])}>
            <CoinVisual denomination={id} />
            <span>{getDenomination(id).shortLabel}</span>
          </AudioButton>
        ))}
      </div>
      <div className="command-tray">
        <strong>{total}p picked</strong>
      </div>
      <AudioButton className="child-button" cue={{ id: "buy-item", text: "Try to buy it.", tone: "tap" }} onClick={buy}>
        <Check aria-hidden="true" />
        Buy
      </AudioButton>
      {done ? <CompleteMessage alreadyDone={alreadyDone} /> : null}
    </div>
  );
}

function MoreOrLess({ level, onComplete, alreadyDone }: GameProps) {
  const [done, setDone] = useState(alreadyDone);
  const pileA = level.pileA ?? ["uk-1p"];
  const pileB = level.pileB ?? ["uk-2p"];
  const totalA = pileTotal(pileA);
  const totalB = pileTotal(pileB);
  const answer = totalA >= totalB ? "A" : "B";

  function choose(choice: "A" | "B") {
    if (choice === answer) {
      setDone(true);
      if (!done) onComplete();
    } else {
      speak({ id: "more-hint", text: "Try the pile with the bigger amount.", tone: "hint" });
    }
  }

  return (
    <div className="compare-game">
      <button className="pile-button" type="button" onClick={() => choose("A")} aria-label="Pile A">
        {pileA.map((id, index) => (
          <CoinVisual key={`${id}-${index}`} denomination={id} />
        ))}
      </button>
      <button className="pile-button" type="button" onClick={() => choose("B")} aria-label="Pile B">
        {pileB.map((id, index) => (
          <CoinVisual key={`${id}-${index}`} denomination={id} />
        ))}
      </button>
      {done ? <CompleteMessage alreadyDone={alreadyDone} /> : null}
    </div>
  );
}

function CoinSorter({ level, onComplete, alreadyDone }: GameProps) {
  const groups = level.sortGroups ?? [];
  const coinIds = level.denominations?.length ? level.denominations : groups.flatMap((group) => group.denominationIds);
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  const done = Object.keys(placed).length >= coinIds.length || alreadyDone;

  function onDragEnd(event: DragEndEvent) {
    const coinId = String(event.active.id).replace("sort-", "") as DenominationId;
    const groupId = String(event.over?.id ?? "");
    const group = groups.find((entry) => entry.id === groupId);
    if (!group) return;
    if (group.denominationIds.includes(coinId)) {
      const next = { ...placed, [coinId]: groupId };
      setPlaced(next);
      if (Object.keys(next).length >= coinIds.length && !done) onComplete();
    } else {
      speak({ id: "sort-hint", text: "Try a coin that matches this family.", tone: "hint" });
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div className="sorter-game">
        <div className="coin-bank-row">
          {coinIds.map((id) => (placed[id] ? null : <DraggableSortCoin key={id} id={id} />))}
        </div>
        <div className="sort-zones">
          {groups.map((group) => (
            <SortZone key={group.id} group={group} count={Object.values(placed).filter((id) => id === group.id).length} />
          ))}
        </div>
        {done ? <CompleteMessage alreadyDone={alreadyDone} /> : null}
      </div>
    </DndContext>
  );
}

function DraggableSortCoin({ id }: { id: DenominationId }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: `sort-${id}` });
  return (
    <button ref={setNodeRef} className="draggable-coin" style={{ transform: CSS.Translate.toString(transform) }} {...listeners} {...attributes} type="button">
      <CoinVisual denomination={id} />
    </button>
  );
}

function SortZone({ group, count }: { group: SortGroup; count: number }) {
  const { setNodeRef, isOver } = useDroppable({ id: group.id });
  return (
    <div ref={setNodeRef} className={`sort-zone ${isOver ? "over" : ""}`}>
      <strong>{group.label}</strong>
      <span>{count}</span>
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
    if (!over || active.id === over.id) return;
    setItems((current) => {
      const next = arrayMove(current, current.indexOf(String(active.id)), current.indexOf(String(over.id)));
      if (next.join("|") === sequence.join("|")) {
        setDone(true);
        if (!done) window.setTimeout(onComplete, 120);
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
            if (!done) onComplete();
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
    <button className="step-card" ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} {...attributes} {...listeners} type="button">
      <span className="step-picture">{id.slice(0, 1)}</span>
      <span>{id}</span>
    </button>
  );
}

function MoveBot({ level, onComplete, alreadyDone }: GameProps) {
  return <PathBuilder level={level} onComplete={onComplete} alreadyDone={alreadyDone} target={level.path ?? []} />;
}

function BugHunt({ level, onComplete, alreadyDone }: GameProps) {
  return <PathBuilder level={level} onComplete={onComplete} alreadyDone={alreadyDone} target={level.path ?? []} initial={level.buggyPath ?? []} />;
}

function PathBuilder({ level, onComplete, alreadyDone, target, initial = [] }: GameProps & { target: Direction[]; initial?: Direction[] }) {
  const [commands, setCommands] = useState<Direction[]>(initial);
  const [done, setDone] = useState(alreadyDone);
  const finalPosition = target.reduce(movePosition, { x: 0, y: 0 });
  const botPosition = commands.reduce(movePosition, { x: 0, y: 0 });

  function run() {
    if (commands.join("|") === target.join("|")) {
      setDone(true);
      if (!done) onComplete();
    } else {
      speak({ id: "move-hint", text: level.buggyPath ? "Swap the command that bumps the wall." : "Try the arrows in the same order you hear them.", tone: "hint" });
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
        {arrowChoices.map((direction) => (
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

function ChoiceGame({ level, onComplete, alreadyDone, mode }: GameProps & { mode: "pattern" | "weather" | "shape" }) {
  const [done, setDone] = useState(alreadyDone);
  const choices = level.choices ?? [];
  const expected = level.expectedChoice ?? choices[0];

  function choose(choice: string) {
    if (choice === expected) {
      setDone(true);
      if (!done) onComplete();
    } else {
      speak({ id: "choice-hint", text: "Try the picture that matches the clue.", tone: "hint" });
    }
  }

  return (
    <div className={`${mode}-game choice-game`}>
      {mode === "pattern" ? (
        <div className="pattern-row">
          {(level.pattern ?? []).map((item, index) => (
            <span key={`${item}-${index}`} className="pattern-card">
              {item}
            </span>
          ))}
          <span className="pattern-card mystery">?</span>
        </div>
      ) : (
        <div className="condition-card">{level.condition ?? "Command"}</div>
      )}
      <div className="choice-grid">
        {choices.map((choice) => (
          <AudioButton key={choice} className={`choice-card choice-${choice.toLowerCase()}`} cue={{ id: `choice-${choice}`, text: choice, tone: "tap" }} onClick={() => choose(choice)}>
            {choice}
          </AudioButton>
        ))}
      </div>
      {done ? <CompleteMessage alreadyDone={alreadyDone} /> : null}
    </div>
  );
}

function pileTotal(pile: DenominationId[]) {
  return pile.reduce((sum, id) => sum + getDenomination(id).valueMinor, 0);
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
