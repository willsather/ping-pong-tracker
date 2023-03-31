import CreatePlayer from "@/src/components/players/CreatePlayer";
import PlayerClient from "@/src/clients/PlayerClient";
import { stubPlayers } from "@/__mocks__/stubPlayers";
import { stubPlayer } from "@/__mocks__/stubPlayer";
import { act, render, screen } from "@testing-library/react";

describe("Players", () => {
  const getPlayersSpy = jest.fn().mockResolvedValue(() => stubPlayers);
  const getPlayerSpy = jest.fn().mockResolvedValue(() => stubPlayer);
  const createPlayerSpy = jest.fn();
  const updatePlayerSpy = jest.fn();
  const removePlayerSpy = jest.fn();

  const stubPlayerClient: PlayerClient = {
    getPlayers: getPlayersSpy,
    getPlayer: getPlayerSpy,
    createPlayer: createPlayerSpy,
    updatePlayer: updatePlayerSpy,
    removePlayer: removePlayerSpy,
  };

  beforeEach(async () => {
    render(<CreatePlayer playerClient={stubPlayerClient} />);
    await act(async () => {
      await getPlayersSpy;
      await getPlayerSpy;
    });
  });

  it("should render", () => {
    expect(screen.getByText("Create a new player")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Player" })).toBeInTheDocument();
  });
});
