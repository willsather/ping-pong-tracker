import { NextApiRequest } from "next/dist/shared/lib/utils";
import { NextApiResponse } from "next";
import { stubPlayers } from "@/__mocks__/stubPlayers";
import playersApi from "@/pages/api/players/index";
import individualPlayersApi from "@/pages/api/players/[id]";
import { stubPlayer } from "@/__mocks__/stubPlayer";

const getPlayersSpy = jest.fn().mockImplementation(() => stubPlayers);
const getPlayerSpy = jest.fn().mockImplementation(() => stubPlayer);
const createPlayerSpy = jest.fn();
const updatePlayerSpy = jest.fn();
const removePlayerSpy = jest.fn();

jest.mock("@/src/services/PlayerService", () => {
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

describe("players api", () => {
  const json = jest.fn();
  const status = jest.fn(() => {
    return {
      json,
    };
  });

  const response = {
    status,
  } as unknown as NextApiResponse;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET and POST", () => {
    it("retrieves all players", async () => {
      await playersApi(
        {
          method: "GET",
        } as NextApiRequest,
        response
      );
      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(stubPlayers);
      expect(getPlayersSpy).toHaveBeenCalled();
    });

    it("create a new player", async () => {
      await playersApi(
        {
          method: "POST",
          body: {
            player: {
              name: "Fake name",
              username: "Fake username",
              city: "Boston",
            },
          },
        } as NextApiRequest,
        response
      );
      expect(status).toHaveBeenCalledWith(201);
      expect(createPlayerSpy).toHaveBeenCalled();
    });
  });

  describe("PUT and DELETE", () => {
    it("retrieves a single player", async () => {
      await individualPlayersApi(
        {
          method: "GET",
          query: {
            id: "fake-user-id",
          },
        } as unknown as NextApiRequest,
        response
      );
      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(stubPlayer);
      expect(getPlayerSpy).toHaveBeenCalled();
    });

    it("updates a single player", async () => {
      await individualPlayersApi(
        {
          method: "PUT",
          body: {
            player: {
              name: "Fake name",
              username: "Fake username",
              city: "Boston",
            },
          },
          query: {
            id: "fake-user-id",
          },
        } as unknown as NextApiRequest,
        response
      );
      expect(status).toHaveBeenCalledWith(200);
      expect(updatePlayerSpy).toHaveBeenCalled();
    });

    it("deletes a single player", async () => {
      await individualPlayersApi(
        {
          method: "DELETE",
          query: {
            id: "fake-user-id",
          },
        } as unknown as NextApiRequest,
        response
      );
      expect(status).toHaveBeenCalledWith(200);
      expect(removePlayerSpy).toHaveBeenCalled();
    });
  });
});
