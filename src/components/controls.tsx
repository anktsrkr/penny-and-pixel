import type { ButtonHTMLAttributes } from "react";
import type { AudioCue } from "../types";
import { speak } from "../lib/audio";

interface AudioButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  cue: AudioCue;
}

export function AudioButton({ cue, onClick, children, ...props }: AudioButtonProps) {
  return (
    <button
      {...props}
      onClick={(event) => {
        speak(cue);
        onClick?.(event);
      }}
    >
      {children}
    </button>
  );
}
