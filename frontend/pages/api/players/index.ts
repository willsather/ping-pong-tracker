import type { NextApiRequest, NextApiResponse } from "next";
import PlayerService from "@/src/services/PlayerService";
import { PlayerDto } from "@/types/PlayerDto";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const playerService = new PlayerService();

  switch (method) {
    case "GET":
      try {
        const players = await playerService.getPlayers();
        res.status(200).json(players);
      } catch (e) {
        console.error(e);
        res.status(400).json("Error: Failed to retrieve all players");
      }
      break;

    case "POST":
      const body = JSON.parse(req.body);
      try {
        if (!body.player) {
          res.status(400).json("Missing Player Object");
          return;
        }

        const playerDto = PlayerDto.check(body.player);

        if (!playerDto) {
          res.status(400).json("Invalid Player Object");
          return;
        }

        await playerService.createPlayer(playerDto);
        res.status(201);
      } catch (e) {
        console.error(e);
        res.status(400).json("Error: Failed to create new player");
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
