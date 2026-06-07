import type { GameDefinition } from "../types";

export const codingGames: GameDefinition[] = [
  {
    id: "step-shuffle",
    title: "Step Shuffle",
    shortTitle: "Steps",
    world: "code",
    mascot: "pixel",
    goal: "Drag the picture cards into the right order.",
    color: "#7f77dd",
    levels: [
      { id: "ss-1", title: "Morning steps", narrator: "Put wake, eat, hop in order.", stars: 2, sequence: ["Wake", "Eat", "Hop"], shuffled: ["Eat", "Hop", "Wake"] },
      { id: "ss-2", title: "Garden steps", narrator: "Put seed, water, flower in order.", stars: 2, sequence: ["Seed", "Water", "Flower"], shuffled: ["Flower", "Seed", "Water"] },
      { id: "ss-3", title: "Bedtime steps", narrator: "Put bath, book, sleep in order.", stars: 3, sequence: ["Bath", "Book", "Sleep"], shuffled: ["Sleep", "Bath", "Book"] },
      { id: "ss-4", title: "Snack steps", narrator: "Put wash, peel, eat in order.", stars: 3, sequence: ["Wash", "Peel", "Eat"], shuffled: ["Eat", "Wash", "Peel"] }
    ]
  },
  {
    id: "move-bot",
    title: "Move Bot",
    shortTitle: "Move",
    world: "code",
    mascot: "pixel",
    goal: "Build the arrows that guide Pixel to the star.",
    color: "#248bd6",
    levels: [
      { id: "mb-1", title: "Two steps", narrator: "Move right, then down.", stars: 2, path: ["right", "down"] },
      { id: "mb-2", title: "Three steps", narrator: "Move right, right, then down.", stars: 2, path: ["right", "right", "down"] },
      { id: "mb-3", title: "Turn around", narrator: "Move down, right, then up.", stars: 3, path: ["down", "right", "up"] },
      { id: "mb-4", title: "Little maze", narrator: "Move down, down, right, right.", stars: 3, path: ["down", "down", "right", "right"] },
      { id: "mb-5", title: "Star trail", narrator: "Move right, down, right, down.", stars: 3, path: ["right", "down", "right", "down"] }
    ]
  },
  {
    id: "repeat-pattern",
    title: "Repeat Pattern",
    shortTitle: "Repeat",
    world: "code",
    mascot: "pixel",
    goal: "Finish the repeating pattern.",
    color: "#f59f00",
    levels: [
      { id: "rp-1", title: "Red blue", narrator: "Finish red, blue, red, blue.", stars: 2, pattern: ["Red", "Blue", "Red", "Blue"], expectedChoice: "Blue", choices: ["Blue", "Green", "Yellow"] },
      { id: "rp-2", title: "Clap tap", narrator: "Finish clap, tap, clap, tap.", stars: 2, pattern: ["Clap", "Tap", "Clap", "Tap"], expectedChoice: "Tap", choices: ["Jump", "Tap", "Spin"] },
      { id: "rp-3", title: "Star moon", narrator: "Finish star, moon, star, moon.", stars: 3, pattern: ["Star", "Moon", "Star", "Moon"], expectedChoice: "Moon", choices: ["Sun", "Moon", "Cloud"] },
      { id: "rp-4", title: "Hop hop stop", narrator: "Finish hop, hop, stop.", stars: 3, pattern: ["Hop", "Hop", "Stop"], expectedChoice: "Stop", choices: ["Stop", "Hop", "Wave"] }
    ]
  },
  {
    id: "if-then-weather",
    title: "If-Then Weather",
    shortTitle: "If",
    world: "code",
    mascot: "pixel",
    goal: "Pick the action that matches the picture condition.",
    color: "#4dabf7",
    levels: [
      { id: "it-1", title: "Rain", narrator: "If it rains, choose umbrella.", stars: 2, condition: "Rain", expectedChoice: "Umbrella", choices: ["Umbrella", "Sunglasses", "Scarf"] },
      { id: "it-2", title: "Sun", narrator: "If it is sunny, choose sunglasses.", stars: 2, condition: "Sun", expectedChoice: "Sunglasses", choices: ["Coat", "Sunglasses", "Boots"] },
      { id: "it-3", title: "Cold", narrator: "If it is cold, choose coat.", stars: 3, condition: "Cold", expectedChoice: "Coat", choices: ["Coat", "Cap", "Shorts"] },
      { id: "it-4", title: "Puddle", narrator: "If there is a puddle, choose boots.", stars: 3, condition: "Puddle", expectedChoice: "Boots", choices: ["Boots", "Sandals", "Hat"] }
    ]
  },
  {
    id: "bug-hunt",
    title: "Bug Hunt",
    shortTitle: "Fix",
    world: "code",
    mascot: "pixel",
    goal: "Find the wrong command and fix the path.",
    color: "#ef476f",
    levels: [
      { id: "bh-1", title: "Wrong turn", narrator: "Fix the middle arrow.", stars: 2, path: ["right", "down"], buggyPath: ["right", "left"] },
      { id: "bh-2", title: "Wall bump", narrator: "Fix the last arrow.", stars: 2, path: ["right", "right", "down"], buggyPath: ["right", "right", "up"] },
      { id: "bh-3", title: "Almost there", narrator: "Fix one arrow so Pixel reaches the star.", stars: 3, path: ["down", "right", "up"], buggyPath: ["down", "left", "up"] },
      { id: "bh-4", title: "Maze fix", narrator: "Find the command that bumps the wall.", stars: 3, path: ["down", "down", "right"], buggyPath: ["down", "up", "right"] }
    ]
  },
  {
    id: "shape-commands",
    title: "Shape Commands",
    shortTitle: "Shapes",
    world: "code",
    mascot: "pixel",
    goal: "Match the command by shape and colour.",
    color: "#20c997",
    levels: [
      { id: "sc-1", title: "Move block", narrator: "Tap the blue arrow move block.", stars: 2, expectedChoice: "Move", choices: ["Move", "Loop", "If"] },
      { id: "sc-2", title: "Loop block", narrator: "Tap the orange circle repeat block.", stars: 2, expectedChoice: "Loop", choices: ["Move", "Loop", "Stop"] },
      { id: "sc-3", title: "If block", narrator: "Tap the yellow diamond if block.", stars: 3, expectedChoice: "If", choices: ["If", "Move", "Dance"] },
      { id: "sc-4", title: "Stop block", narrator: "Tap the red square stop block.", stars: 3, expectedChoice: "Stop", choices: ["Loop", "If", "Stop"] }
    ]
  }
];
