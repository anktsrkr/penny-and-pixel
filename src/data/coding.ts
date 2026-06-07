import type { AgeBand, GameDefinition } from "../types";

const starter: AgeBand[] = ["3-4", "4-5"];
const older: AgeBand[] = ["4-5"];

export const codingGames: GameDefinition[] = [
  {
    id: "same-different",
    title: "Same or Different",
    shortTitle: "Same",
    world: "code",
    ageBands: starter,
    mascot: "pixel",
    goal: "Spot whether two pictures match.",
    color: "#ff8787",
    levels: [
      { id: "sd-1", title: "Two socks", narrator: "Are the socks the same?", stars: 1, ageBands: starter, condition: "Two red socks", expectedChoice: "Same", choices: ["Same", "Different"] },
      { id: "sd-2", title: "Two cars", narrator: "Are the cars different?", stars: 1, ageBands: starter, condition: "Blue car and green car", expectedChoice: "Different", choices: ["Same", "Different"] },
      { id: "sd-3", title: "Two stars", narrator: "Are the stars the same?", stars: 1, ageBands: starter, condition: "Two yellow stars", expectedChoice: "Same", choices: ["Same", "Different"] },
      { id: "sd-4", title: "Two hats", narrator: "Are the hats different?", stars: 1, ageBands: starter, condition: "Big hat and small hat", expectedChoice: "Different", choices: ["Same", "Different"] }
    ]
  },
  {
    id: "tap-trail",
    title: "Tap Trail",
    shortTitle: "Trail",
    world: "code",
    ageBands: starter,
    mascot: "pixel",
    goal: "Tap tiny arrow trails to move Pixel.",
    color: "#74c0fc",
    levels: [
      { id: "tt-1", title: "One step right", narrator: "Tap right, then run.", stars: 1, ageBands: starter, path: ["right"] },
      { id: "tt-2", title: "One step down", narrator: "Tap down, then run.", stars: 1, ageBands: starter, path: ["down"] },
      { id: "tt-3", title: "Two step trail", narrator: "Tap right, down.", stars: 2, ageBands: starter, path: ["right", "down"] },
      { id: "tt-4", title: "Tiny corner", narrator: "Tap down, right.", stars: 2, ageBands: starter, path: ["down", "right"] }
    ]
  },
  {
    id: "sound-sequence",
    title: "Sound Sequence",
    shortTitle: "Sounds",
    world: "code",
    ageBands: starter,
    mascot: "pixel",
    goal: "Finish a little sound pattern.",
    color: "#ffd43b",
    levels: [
      { id: "sq-1", title: "Clap clap", narrator: "Finish clap, clap.", stars: 1, ageBands: starter, pattern: ["Clap", "Clap"], expectedChoice: "Clap", choices: ["Clap", "Tap", "Hop"] },
      { id: "sq-2", title: "Tap tap", narrator: "Finish tap, tap.", stars: 1, ageBands: starter, pattern: ["Tap", "Tap"], expectedChoice: "Tap", choices: ["Hop", "Tap", "Spin"] },
      { id: "sq-3", title: "Clap tap", narrator: "Finish clap, tap, clap.", stars: 2, ageBands: starter, pattern: ["Clap", "Tap", "Clap"], expectedChoice: "Tap", choices: ["Tap", "Clap", "Jump"] },
      { id: "sq-4", title: "Hop stop", narrator: "Finish hop, stop, hop.", stars: 2, ageBands: starter, pattern: ["Hop", "Stop", "Hop"], expectedChoice: "Stop", choices: ["Stop", "Hop", "Wave"] }
    ]
  },
  {
    id: "step-shuffle",
    title: "Step Shuffle",
    shortTitle: "Steps",
    world: "code",
    ageBands: starter,
    mascot: "pixel",
    goal: "Drag the picture cards into the right order.",
    color: "#7f77dd",
    levels: [
      { id: "ss-1", title: "Morning steps", narrator: "Put wake, eat, hop in order.", stars: 2, ageBands: starter, sequence: ["Wake", "Eat", "Hop"], shuffled: ["Eat", "Hop", "Wake"] },
      { id: "ss-2", title: "Garden steps", narrator: "Put seed, water, flower in order.", stars: 2, ageBands: starter, sequence: ["Seed", "Water", "Flower"], shuffled: ["Flower", "Seed", "Water"] },
      { id: "ss-3", title: "Bedtime steps", narrator: "Put bath, book, sleep in order.", stars: 3, ageBands: older, sequence: ["Bath", "Book", "Sleep"], shuffled: ["Sleep", "Bath", "Book"] },
      { id: "ss-4", title: "Snack steps", narrator: "Put wash, peel, eat in order.", stars: 3, ageBands: older, sequence: ["Wash", "Peel", "Eat"], shuffled: ["Eat", "Wash", "Peel"] },
      { id: "ss-5", title: "Painting steps", narrator: "Put dip, paint, dry in order.", stars: 3, ageBands: older, sequence: ["Dip", "Paint", "Dry"], shuffled: ["Paint", "Dry", "Dip"] }
    ]
  },
  {
    id: "move-bot",
    title: "Move Bot",
    shortTitle: "Move",
    world: "code",
    ageBands: older,
    mascot: "pixel",
    goal: "Build the arrows that guide Pixel to the star.",
    color: "#248bd6",
    levels: [
      { id: "mb-1", title: "Two steps", narrator: "Move right, then down.", stars: 2, ageBands: older, path: ["right", "down"] },
      { id: "mb-2", title: "Three steps", narrator: "Move right, right, then down.", stars: 2, ageBands: older, path: ["right", "right", "down"] },
      { id: "mb-3", title: "Turn around", narrator: "Move down, right, then up.", stars: 3, ageBands: older, path: ["down", "right", "up"] },
      { id: "mb-4", title: "Little maze", narrator: "Move down, down, right, right.", stars: 3, ageBands: older, path: ["down", "down", "right", "right"] },
      { id: "mb-5", title: "Star trail", narrator: "Move right, down, right, down.", stars: 3, ageBands: older, path: ["right", "down", "right", "down"] },
      { id: "mb-6", title: "Tall path", narrator: "Move down, right, right, up.", stars: 3, ageBands: older, path: ["down", "right", "right", "up"] }
    ]
  },
  {
    id: "repeat-pattern",
    title: "Repeat Pattern",
    shortTitle: "Repeat",
    world: "code",
    ageBands: starter,
    mascot: "pixel",
    goal: "Finish the repeating pattern.",
    color: "#f59f00",
    levels: [
      { id: "rp-1", title: "Red blue", narrator: "Finish red, blue, red, blue.", stars: 2, ageBands: starter, pattern: ["Red", "Blue", "Red", "Blue"], expectedChoice: "Blue", choices: ["Blue", "Green", "Yellow"] },
      { id: "rp-2", title: "Clap tap", narrator: "Finish clap, tap, clap, tap.", stars: 2, ageBands: starter, pattern: ["Clap", "Tap", "Clap", "Tap"], expectedChoice: "Tap", choices: ["Jump", "Tap", "Spin"] },
      { id: "rp-3", title: "Star moon", narrator: "Finish star, moon, star, moon.", stars: 3, ageBands: older, pattern: ["Star", "Moon", "Star", "Moon"], expectedChoice: "Moon", choices: ["Sun", "Moon", "Cloud"] },
      { id: "rp-4", title: "Hop hop stop", narrator: "Finish hop, hop, stop.", stars: 3, ageBands: older, pattern: ["Hop", "Hop", "Stop"], expectedChoice: "Stop", choices: ["Stop", "Hop", "Wave"] },
      { id: "rp-5", title: "Red red blue", narrator: "Finish red, red, blue.", stars: 3, ageBands: older, pattern: ["Red", "Red", "Blue"], expectedChoice: "Blue", choices: ["Blue", "Red", "Green"] }
    ]
  },
  {
    id: "if-then-weather",
    title: "If-Then Weather",
    shortTitle: "If",
    world: "code",
    ageBands: older,
    mascot: "pixel",
    goal: "Pick the action that matches the picture condition.",
    color: "#4dabf7",
    levels: [
      { id: "it-1", title: "Rain", narrator: "If it rains, choose umbrella.", stars: 2, ageBands: older, condition: "Rain", expectedChoice: "Umbrella", choices: ["Umbrella", "Sunglasses", "Scarf"] },
      { id: "it-2", title: "Sun", narrator: "If it is sunny, choose sunglasses.", stars: 2, ageBands: older, condition: "Sun", expectedChoice: "Sunglasses", choices: ["Coat", "Sunglasses", "Boots"] },
      { id: "it-3", title: "Cold", narrator: "If it is cold, choose coat.", stars: 3, ageBands: older, condition: "Cold", expectedChoice: "Coat", choices: ["Coat", "Cap", "Shorts"] },
      { id: "it-4", title: "Puddle", narrator: "If there is a puddle, choose boots.", stars: 3, ageBands: older, condition: "Puddle", expectedChoice: "Boots", choices: ["Boots", "Sandals", "Hat"] },
      { id: "it-5", title: "Wind", narrator: "If it is windy, choose kite.", stars: 3, ageBands: older, condition: "Wind", expectedChoice: "Kite", choices: ["Kite", "Towel", "Cup"] }
    ]
  },
  {
    id: "bug-hunt",
    title: "Bug Hunt",
    shortTitle: "Fix",
    world: "code",
    ageBands: older,
    mascot: "pixel",
    goal: "Find the wrong command and fix the path.",
    color: "#ef476f",
    levels: [
      { id: "bh-1", title: "Wrong turn", narrator: "Fix the middle arrow.", stars: 2, ageBands: older, path: ["right", "down"], buggyPath: ["right", "left"] },
      { id: "bh-2", title: "Wall bump", narrator: "Fix the last arrow.", stars: 2, ageBands: older, path: ["right", "right", "down"], buggyPath: ["right", "right", "up"] },
      { id: "bh-3", title: "Almost there", narrator: "Fix one arrow so Pixel reaches the star.", stars: 3, ageBands: older, path: ["down", "right", "up"], buggyPath: ["down", "left", "up"] },
      { id: "bh-4", title: "Maze fix", narrator: "Find the command that bumps the wall.", stars: 3, ageBands: older, path: ["down", "down", "right"], buggyPath: ["down", "up", "right"] },
      { id: "bh-5", title: "Side step", narrator: "Fix the first arrow.", stars: 3, ageBands: older, path: ["right", "down", "right"], buggyPath: ["left", "down", "right"] }
    ]
  },
  {
    id: "shape-commands",
    title: "Shape Commands",
    shortTitle: "Shapes",
    world: "code",
    ageBands: starter,
    mascot: "pixel",
    goal: "Match the command by shape and colour.",
    color: "#20c997",
    levels: [
      { id: "sc-1", title: "Move block", narrator: "Tap the blue arrow move block.", stars: 2, ageBands: starter, expectedChoice: "Move", choices: ["Move", "Loop", "If"] },
      { id: "sc-2", title: "Loop block", narrator: "Tap the orange circle repeat block.", stars: 2, ageBands: starter, expectedChoice: "Loop", choices: ["Move", "Loop", "Stop"] },
      { id: "sc-3", title: "If block", narrator: "Tap the yellow diamond if block.", stars: 3, ageBands: older, expectedChoice: "If", choices: ["If", "Move", "Dance"] },
      { id: "sc-4", title: "Stop block", narrator: "Tap the red square stop block.", stars: 3, ageBands: older, expectedChoice: "Stop", choices: ["Loop", "If", "Stop"] },
      { id: "sc-5", title: "Dance block", narrator: "Tap the purple dance block.", stars: 3, ageBands: older, expectedChoice: "Dance", choices: ["Move", "Dance", "If"] }
    ]
  }
];
