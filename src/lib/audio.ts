import { Howl } from "howler";
import type { AudioCue } from "../types";

const enabled = { current: true };

const tapTone = new Howl({
  src: [
    "data:audio/wav;base64,UklGRjQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YRAAAAAAAP//AAD//wAA//8AAP//AAD//wAA"
  ],
  volume: 0.25
});

export function setAudioEnabled(value: boolean) {
  enabled.current = value;
}

export function speak(cue: AudioCue) {
  if (!enabled.current) {
    return;
  }

  if (cue.tone) {
    tapTone.stop();
    tapTone.play();
  }

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cue.text);
    utterance.rate = 0.88;
    utterance.pitch = 1.15;
    window.speechSynthesis.speak(utterance);
  }
}
