import type { AgeBand, GameDefinition } from "../types";

const starter: AgeBand[] = ["3-4", "4-5"];

export const discoveryGames: GameDefinition[] = [
  {
    id: "alphabet-garden",
    title: "Alphabet Garden",
    shortTitle: "ABC",
    world: "discover",
    ageBands: starter,
    mascot: "pixel",
    goal: "Match first letters with friendly pictures.",
    color: "#f783ac",
    levels: [
      { id: "ag-1", title: "A is for apple", narrator: "A. Tap apple.", stars: 1, ageBands: starter, condition: "A", expectedChoice: "Apple", targetPicture: "apple", choices: ["Apple", "Cat", "Dog"], choicePictures: { Apple: "apple", Cat: "cat", Dog: "dog" } },
      { id: "ag-2", title: "B is for ball", narrator: "B. Tap ball.", stars: 1, ageBands: starter, condition: "B", expectedChoice: "Ball", targetPicture: "ball", choices: ["Ball", "Apple", "Dog"], choicePictures: { Ball: "ball", Apple: "apple", Dog: "dog" } },
      { id: "ag-3", title: "C is for cat", narrator: "C. Tap cat.", stars: 1, ageBands: starter, condition: "C", expectedChoice: "Cat", targetPicture: "cat", choices: ["Cat", "Ball", "Apple"], choicePictures: { Cat: "cat", Ball: "ball", Apple: "apple" } },
      { id: "ag-4", title: "D is for dog", narrator: "D. Tap dog.", stars: 1, ageBands: starter, condition: "D", expectedChoice: "Dog", targetPicture: "dog", choices: ["Dog", "Cat", "Ball"], choicePictures: { Dog: "dog", Cat: "cat", Ball: "ball" } }
    ]
  },
  {
    id: "number-nest",
    title: "Number Nest",
    shortTitle: "123",
    world: "discover",
    ageBands: starter,
    mascot: "penny",
    goal: "Count picture groups from one to four.",
    color: "#69db7c",
    levels: [
      { id: "nn-1", title: "One flower", narrator: "Count one flower. Tap one.", stars: 1, ageBands: starter, condition: "How many?", expectedChoice: "1", targetPicture: "one-flower", choices: ["1", "2", "3"] },
      { id: "nn-2", title: "Two birds", narrator: "Count two birds. Tap two.", stars: 1, ageBands: starter, condition: "How many?", expectedChoice: "2", targetPicture: "two-birds", choices: ["1", "2", "4"] },
      { id: "nn-3", title: "Three cats", narrator: "Count three cats. Tap three.", stars: 1, ageBands: starter, condition: "How many?", expectedChoice: "3", targetPicture: "three-cats", choices: ["2", "3", "4"] },
      { id: "nn-4", title: "Four ducks", narrator: "Count four ducks. Tap four.", stars: 1, ageBands: starter, condition: "How many?", expectedChoice: "4", targetPicture: "four-ducks", choices: ["1", "3", "4"] }
    ]
  },
  {
    id: "animal-friends",
    title: "Animal Friends",
    shortTitle: "Animals",
    world: "discover",
    ageBands: starter,
    mascot: "penny",
    goal: "Find common animals by picture and sound.",
    color: "#ffa94d",
    levels: [
      { id: "af-1", title: "Find lion", narrator: "Tap the lion.", stars: 1, ageBands: starter, expectedChoice: "Lion", targetPicture: "lion", choices: ["Lion", "Rabbit", "Fish"], choicePictures: { Lion: "lion", Rabbit: "rabbit", Fish: "fish" } },
      { id: "af-2", title: "Find rabbit", narrator: "Tap the rabbit.", stars: 1, ageBands: starter, expectedChoice: "Rabbit", targetPicture: "rabbit", choices: ["Cow", "Rabbit", "Cat"], choicePictures: { Cow: "cow", Rabbit: "rabbit", Cat: "cat" } },
      { id: "af-3", title: "Find fish", narrator: "Tap the fish.", stars: 1, ageBands: starter, expectedChoice: "Fish", targetPicture: "fish", choices: ["Fish", "Dog", "Lion"], choicePictures: { Fish: "fish", Dog: "dog", Lion: "lion" } },
      { id: "af-4", title: "Find cow", narrator: "Tap the cow.", stars: 1, ageBands: starter, expectedChoice: "Cow", targetPicture: "cow", choices: ["Rabbit", "Cow", "Fish"], choicePictures: { Rabbit: "rabbit", Cow: "cow", Fish: "fish" } }
    ]
  },
  {
    id: "bird-watch",
    title: "Bird Watch",
    shortTitle: "Birds",
    world: "discover",
    ageBands: starter,
    mascot: "pixel",
    goal: "Spot birds from big picture cards.",
    color: "#74c0fc",
    levels: [
      { id: "bw-1", title: "Robin", narrator: "Tap the robin.", stars: 1, ageBands: starter, expectedChoice: "Robin", targetPicture: "robin", choices: ["Robin", "Duck", "Owl"], choicePictures: { Robin: "robin", Duck: "duck", Owl: "owl" } },
      { id: "bw-2", title: "Duck", narrator: "Tap the duck.", stars: 1, ageBands: starter, expectedChoice: "Duck", targetPicture: "duck", choices: ["Swan", "Duck", "Robin"], choicePictures: { Swan: "swan", Duck: "duck", Robin: "robin" } },
      { id: "bw-3", title: "Owl", narrator: "Tap the owl.", stars: 1, ageBands: starter, expectedChoice: "Owl", targetPicture: "owl", choices: ["Owl", "Duck", "Swan"], choicePictures: { Owl: "owl", Duck: "duck", Swan: "swan" } },
      { id: "bw-4", title: "Swan", narrator: "Tap the swan.", stars: 1, ageBands: starter, expectedChoice: "Swan", targetPicture: "swan", choices: ["Robin", "Swan", "Owl"], choicePictures: { Robin: "robin", Swan: "swan", Owl: "owl" } }
    ]
  },
  {
    id: "flower-patch",
    title: "Flower Patch",
    shortTitle: "Flowers",
    world: "discover",
    ageBands: starter,
    mascot: "penny",
    goal: "Match bright flowers by picture.",
    color: "#b197fc",
    levels: [
      { id: "fp-1", title: "Rose", narrator: "Tap the rose.", stars: 1, ageBands: starter, expectedChoice: "Rose", targetPicture: "rose", choices: ["Rose", "Daisy", "Tulip"], choicePictures: { Rose: "rose", Daisy: "daisy", Tulip: "tulip" } },
      { id: "fp-2", title: "Sunflower", narrator: "Tap the sunflower.", stars: 1, ageBands: starter, expectedChoice: "Sunflower", targetPicture: "sunflower", choices: ["Tulip", "Sunflower", "Rose"], choicePictures: { Tulip: "tulip", Sunflower: "sunflower", Rose: "rose" } },
      { id: "fp-3", title: "Daisy", narrator: "Tap the daisy.", stars: 1, ageBands: starter, expectedChoice: "Daisy", targetPicture: "daisy", choices: ["Daisy", "Rose", "Sunflower"], choicePictures: { Daisy: "daisy", Rose: "rose", Sunflower: "sunflower" } },
      { id: "fp-4", title: "Tulip", narrator: "Tap the tulip.", stars: 1, ageBands: starter, expectedChoice: "Tulip", targetPicture: "tulip", choices: ["Sunflower", "Tulip", "Daisy"], choicePictures: { Sunflower: "sunflower", Tulip: "tulip", Daisy: "daisy" } }
    ]
  }
];
