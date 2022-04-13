import React from "react";
import { render, screen } from "@testing-library/react";
import Hoverbar from "../components/Hoverbar";

describe("Checking Profile Page", () => {
  test("Checking data on the profile page", () => {
    render(<Hoverbar />);
    const text = screen.getByText(/Home Favourites/i);
    expect(text);
  });
});
