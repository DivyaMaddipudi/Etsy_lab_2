import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import Hoverbar from "../components/Hoverbar";

describe("Home Page", () => {
  test("Opens home page and check data", () => {
    render(<Dashboard />);
    const text = screen.getByText(
      /Explore one-of-a-kind finds from independent makers/i
    );
    expect(text);
  });
});
