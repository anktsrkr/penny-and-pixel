import type { AgeBand, GameDefinition } from "../types";

const starter: AgeBand[] = ["3-4", "4-5"];

export const storyGames: GameDefinition[] = [
  {
    id: "bedtime-stories",
    title: "Bedtime Stories",
    shortTitle: "Stories",
    world: "story",
    ageBands: starter,
    mascot: "penny",
    goal: "Listen to gentle original bedtime stories.",
    color: "#6c63ff",
    levels: [
      {
        id: "bs-1",
        title: "Penny Finds the Moon",
        narrator: "Listen to Penny Finds the Moon.",
        stars: 1,
        ageBands: starter,
        calmPrompt: "Breathe in. Breathe out.",
        storyLines: [
          "Penny looked out at the soft blue night.",
          "The moon smiled over the garden wall.",
          "Penny whispered, good night little stars.",
          "She tucked her blanket under her chin.",
          "The moon stayed close until morning."
        ]
      },
      {
        id: "bs-2",
        title: "Pixel's Quiet Light",
        narrator: "Listen to Pixel's Quiet Light.",
        stars: 1,
        ageBands: starter,
        calmPrompt: "Hands still. Eyes soft.",
        storyLines: [
          "Pixel had a tiny light inside his chest.",
          "Blink, blink, it glowed warm and slow.",
          "He helped one sleepy cloud find home.",
          "Then Pixel dimmed his little light.",
          "Everything rested, calm and kind."
        ]
      },
      {
        id: "bs-3",
        title: "The Blanket Boat",
        narrator: "Listen to The Blanket Boat.",
        stars: 1,
        ageBands: starter,
        calmPrompt: "Rock gently like a boat.",
        storyLines: [
          "A blanket became a tiny boat.",
          "It sailed across a pillow sea.",
          "Penny waved to one quiet fish.",
          "Pixel counted three soft waves.",
          "The boat came home for sleep."
        ]
      },
      {
        id: "bs-4",
        title: "The Sleepy Garden",
        narrator: "Listen to The Sleepy Garden.",
        stars: 1,
        ageBands: starter,
        calmPrompt: "Pretend to close like a flower.",
        storyLines: [
          "The daisies closed their yellow eyes.",
          "The tulips nodded in the breeze.",
          "A robin folded both small wings.",
          "Penny tiptoed past the flowers.",
          "Good night garden, she said."
        ]
      }
    ]
  },
  {
    id: "gentle-rhymes",
    title: "Gentle Rhymes",
    shortTitle: "Rhymes",
    world: "story",
    ageBands: starter,
    mascot: "pixel",
    goal: "Play soft original rhymes and repeat the refrain.",
    color: "#b197fc",
    levels: [
      {
        id: "gr-1",
        title: "Little Star Steps",
        narrator: "Listen to Little Star Steps.",
        stars: 1,
        ageBands: starter,
        refrain: "Step, step, sleepy star.",
        storyLines: [
          "Little star over the hill,",
          "Shines so soft and stays so still,",
          "Step, step, sleepy star,",
          "Dreams are near, not very far."
        ]
      },
      {
        id: "gr-2",
        title: "Cloud Pillow",
        narrator: "Listen to Cloud Pillow.",
        stars: 1,
        ageBands: starter,
        refrain: "Float, float, little cloud.",
        storyLines: [
          "Cloud pillow, soft and white,",
          "Carries dreams across the night,",
          "Float, float, little cloud,",
          "Whisper gently, not too loud."
        ]
      },
      {
        id: "gr-3",
        title: "Tiny Toes",
        narrator: "Listen to Tiny Toes.",
        stars: 1,
        ageBands: starter,
        refrain: "Rest now, tiny toes.",
        storyLines: [
          "Tiny toes had danced all day,",
          "Jumped and wiggled every way,",
          "Rest now, tiny toes,",
          "Under blankets, warm and close."
        ]
      },
      {
        id: "gr-4",
        title: "Good Night Drum",
        narrator: "Listen to Good Night Drum.",
        stars: 1,
        ageBands: starter,
        refrain: "Tap tap, hush hush.",
        storyLines: [
          "Tap tap, hush hush,",
          "Even drums can sleep,",
          "Tap tap, hush hush,",
          "Dreams are soft and deep."
        ]
      }
    ]
  },
  {
    id: "sleepy-sequences",
    title: "Sleepy Sequences",
    shortTitle: "Sleep",
    world: "story",
    ageBands: starter,
    mascot: "penny",
    goal: "Follow simple bedtime steps in order.",
    color: "#4dabf7",
    levels: [
      {
        id: "sl-1",
        title: "Brush Book Bed",
        narrator: "Put brush, book, bed in order.",
        stars: 1,
        ageBands: starter,
        sequence: ["Brush", "Book", "Bed"],
        shuffled: ["Book", "Bed", "Brush"]
      },
      {
        id: "sl-2",
        title: "Bath Pyjamas Cuddle",
        narrator: "Put bath, pyjamas, cuddle in order.",
        stars: 1,
        ageBands: starter,
        sequence: ["Bath", "Pyjamas", "Cuddle"],
        shuffled: ["Cuddle", "Bath", "Pyjamas"]
      },
      {
        id: "sl-3",
        title: "Toy Basket Blanket",
        narrator: "Put toy, basket, blanket in order.",
        stars: 1,
        ageBands: starter,
        sequence: ["Toy", "Basket", "Blanket"],
        shuffled: ["Blanket", "Toy", "Basket"]
      },
      {
        id: "sl-4",
        title: "Wave Moon Sleep",
        narrator: "Put wave, moon, sleep in order.",
        stars: 1,
        ageBands: starter,
        sequence: ["Wave", "Moon", "Sleep"],
        shuffled: ["Moon", "Sleep", "Wave"]
      }
    ]
  }
];
