import PlayerService from "@/src/services/PlayerService";
import { stubPlayers } from "@/__mocks__/stubPlayers";
import { stubPlayer } from "@/__mocks__/stubPlayer";
import { stubPlayerDto } from "@/__mocks__/stubPlayerDto";

const getPlayersSpy = jest.fn().mockImplementation(() => stubPlayers);
const getPlayerSpy = jest.fn().mockImplementation(() => stubPlayer);
const createPlayerSpy = jest.fn();
const updatePlayerSpy = jest.fn();
const removePlayerSpy = jest.fn();

jest.mock("@/src/repositories/PlayerRepository", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getPlayers: getPlayersSpy,
      getPlayer: getPlayerSpy,
      createPlayer: createPlayerSpy,
      updatePlayer: updatePlayerSpy,
      removePlayer: removePlayerSpy,
    };
  });
});

describe("PlayerService", () => {
  it("should return all players", async () => {
    const service = new PlayerService();
    const players = await service.getPlayers();

    expect(players).toBe(stubPlayers);
    expect(getPlayersSpy).toHaveBeenCalled();
  });

  it("should return a single player", async () => {
    const service = new PlayerService();
    const players = await service.getPlayer(stubPlayer._id.toString());

    expect(players).toBe(stubPlayer);
    expect(getPlayerSpy).toHaveBeenCalled();
  });

  it("should create a new player", async () => {
    const service = new PlayerService();

    await service.createPlayer(stubPlayerDto);
    expect(createPlayerSpy).toHaveBeenCalled();
  });

  it("should update a player", async () => {
    const service = new PlayerService();

    const newPlayerDto = {
      name: stubPlayerDto.name,
      username: stubPlayerDto.username,
      city: "New York City",
    }

    await service.updatePlayer(newPlayerDto, stubPlayer._id.toString());
    expect(updatePlayerSpy).toHaveBeenCalled();
  });

  it("should delete a player", async () => {
    const service = new PlayerService();

    await service.removePlayer(stubPlayer._id.toString());
    expect(removePlayerSpy).toHaveBeenCalled();
  });
});
