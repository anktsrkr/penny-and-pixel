import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

Object.defineProperty(window, "speechSynthesis", {
  value: {
    cancel: vi.fn(),
    speak: vi.fn()
  },
  writable: true
});

class MockSpeechSynthesisUtterance {
  text: string;
  rate = 1;
  pitch = 1;

  constructor(text: string) {
    this.text = text;
  }
}

Object.defineProperty(window, "SpeechSynthesisUtterance", {
  value: MockSpeechSynthesisUtterance,
  writable: true
});

Object.defineProperty(globalThis, "SpeechSynthesisUtterance", {
  value: MockSpeechSynthesisUtterance,
  writable: true
});
