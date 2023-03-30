import PlayerRepository from "@/src/repositories/PlayerRepository";
import { stubPlayers } from "@/__mocks__/stubPlayers";
import { stubPlayer } from "@/__mocks__/stubPlayer";

const getPlayersSpy = jest.fn().mockImplementation(() => stubPlayers);
const getPlayerSpy = jest.fn().mockImplementation(() => stubPlayer);

jest.mock("@/src/repositories/PlayerRepository", () => {
  return jest.fn().mockImplementation(() => {
    return { getPlayers: getPlayersSpy, getPlayer: getPlayerSpy };
  });
});

describe("PlayerRepository", () => {
  it("should retrieve all players", async () => {
    const repository = new PlayerRepository();
    const players = await repository.getPlayers();

    expect(players).toHaveLength(2);
    expect(players[0]).toEqual(stubPlayers[0]);
    expect(players[1]).toEqual(stubPlayers[1]);
  });

  it("should retrieve a single player by id", async () => {
    const repository = new PlayerRepository();
    const player = await repository.getPlayer(stubPlayer._id.toString());

    expect(player).not.toBeUndefined();
    expect(player).toEqual(stubPlayer);
  });
});
