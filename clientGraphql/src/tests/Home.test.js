import React from "react";
import { render, screen } from "@testing-library/react";
import Hoverbar from "../components/Hoverbar";

describe("Checking header", () => {
  test("Checking header", () => {
    render(<Hoverbar />);
    const text = screen.getByText(/Home Favourites/i);
    expect(text);
  });
});
