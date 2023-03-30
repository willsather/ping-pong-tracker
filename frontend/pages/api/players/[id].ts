import type { NextApiRequest, NextApiResponse } from "next";
import PlayerService from "@/src/services/PlayerService";
import { PlayerDto } from "@/types/PlayerDto";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerService = new PlayerService();
  const { method, query } = req;
  const { id } = query as { id: string };

  switch (method) {
    case "GET":
      try {
        const player = playerService.getPlayer(id);
        res.status(200).json(player);
      } catch (e) {
        console.error(e);
        res.status(400).json("Error: Failed to retrieve all players");
      }
      break;

    case "PUT":
      try {
        if (!req.body?.player) {
          res.status(400).json("Invalid Player Object");
        }

        const playerDto: PlayerDto = req.body.player;

        await playerService.updatePlayer(playerDto, id);
        res.status(200);
      } catch (e) {
        console.error(e);
        res.status(400).json("Error: Failed to update player");
      }
      break;

    case "DELETE":
      try {
        await playerService.removePlayer(id);
        res.status(200);
      } catch (e) {
        console.error(e);
        res.status(400).json("Error: Failed to remove player");
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
