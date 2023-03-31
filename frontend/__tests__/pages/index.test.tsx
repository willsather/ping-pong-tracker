import { act, render, screen } from "@testing-library/react";
import Home from "@/pages/index";

const getPlayersSpy = jest.fn();

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("@/src/clients/PlayerClient", () => {
  return jest.fn().mockImplementation(() => {
    return { getPlayers: () => getPlayersSpy };
  });
});

describe("Home", () => {
  describe("Mongo is connected", () => {
    beforeEach(async () => {
      render(<Home />);

      await act(async () => {
        await getPlayersSpy;
      });
    });

    it("has home page", () => {
      screen.getByText(/Ping Pong Tracker/i);
    });
  });
});
