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
      const player = {
        name: "Fake name",
        username: "Fake username",
        city: "Boston",
      };

      await playersApi(
        {
          method: "POST",
          body: JSON.stringify({ player }),
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
      const player = {
        name: "Fake name",
        username: "Fake username",
        city: "Boston",
      };

      await individualPlayersApi(
        {
          method: "PUT",
          body: JSON.stringify({ player }),
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

  describe("HTTP Failure Codes", () => {
    beforeEach(() => {
      jest.spyOn(console, "warn").mockImplementation(() => jest.fn());
      jest.spyOn(console, "error").mockImplementation(() => jest.fn());
    });

    it("fails to create a new invalid player", async () => {
      const player = {};

      await playersApi(
        {
          method: "POST",
          body: JSON.stringify({ player }),
        } as NextApiRequest,
        response
      );
      expect(status).toHaveBeenCalledWith(400);
      expect(createPlayerSpy).not.toHaveBeenCalled();
    });

    it("fails updates a single invalid player", async () => {
      const player = {};
      await individualPlayersApi(
        {
          method: "PUT",
          body: JSON.stringify({ player }),
          query: {
            id: "fake-user-id",
          },
        } as unknown as NextApiRequest,
        response
      );
      expect(status).toHaveBeenCalledWith(400);
      expect(updatePlayerSpy).not.toHaveBeenCalled();
    });
  });
});
