import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { HomeWorld } from "./HomeWorld";

describe("HomeWorld", () => {
  it("starts on a playable home world", () => {
    render(
      <MemoryRouter>
        <HomeWorld />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /penny & pixel/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /pick adventure/i })).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });
});
