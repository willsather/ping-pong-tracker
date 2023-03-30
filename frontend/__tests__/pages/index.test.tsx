import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

jest.mock("next/router", () => require("next-router-mock"));

describe("Home", () => {
  describe("Mongo is connected", () => {
    beforeEach(() => {
      render(<Home isConnected={true} />);
    });

    it("has home page", () => {
      screen.getByText(/Ping Pong Tracker/i);
    });
  });

  describe("Mongo is not connected", () => {
    beforeEach(() => {
      render(<Home isConnected={false} />);
    });

    it("shows error", () => {
      screen.getByText(/Error: Database is not connected/i);
    });
  });
});
