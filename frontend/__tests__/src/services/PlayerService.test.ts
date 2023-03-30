import PlayerService from "@/src/services/PlayerService";
import { stubPlayers } from "@/__mocks__/stubPlayers";
import { stubPlayer } from "@/__mocks__/stubPlayer";

const getPlayersSpy = jest.fn().mockImplementation(() => stubPlayers);
const getPlayerSpy = jest.fn().mockImplementation(() => stubPlayer);

jest.mock("@/src/repositories/PlayerRepository", () => {
  return jest.fn().mockImplementation(() => {
    return { getPlayers: getPlayersSpy, getPlayer: getPlayerSpy };
  });
});

describe("PlayerService", () => {
  it("should return all players", async () => {
    const service = new PlayerService();
    const players = await service.getPlayers();

    expect(players).toBe(stubPlayers);
  });

  it("should return a single player", async () => {
    const service = new PlayerService();
    const players = await service.getPlayer(stubPlayer._id.toString());

    expect(players).toBe(stubPlayer);
  });
});
