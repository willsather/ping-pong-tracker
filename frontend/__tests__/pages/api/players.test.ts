import { NextApiRequest } from "next/dist/shared/lib/utils";
import { NextApiResponse } from "next";
import { stubPlayers } from "@/__mocks__/stubPlayers"
import getPlayers from "@/pages/api/players";

const getPlayersSpy = jest.fn().mockImplementation(() => stubPlayers);

jest.mock("@/src/services/PlayerService", () => {
    return jest.fn().mockImplementation(() => {
        return { getPlayers: getPlayersSpy };
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

    it("retrieves all players", async () => {
        expect(true).toBeTruthy();
        await getPlayers(
            {
                method: "GET",
            } as NextApiRequest,
            response
        );
        expect(status).toHaveBeenCalledWith(200);
        expect(json).toHaveBeenCalledWith(stubPlayers);
    });

});
