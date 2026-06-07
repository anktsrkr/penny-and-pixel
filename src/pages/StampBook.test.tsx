import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StampBook } from "./StampBook";

describe("StampBook", () => {
  it("shows sticker rewards and disables unaffordable items", () => {
    render(<StampBook />);

    expect(screen.getByRole("heading", { name: /collect stickers/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /rainbow star/i })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /add/i })[0]).toBeDisabled();
  });
});
