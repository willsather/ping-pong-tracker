// import { NextApiRequest, NextApiResponse } from "next";
// import nc from "next-connect";
// import PlayerService from "@/src/services/PlayerService";
// import { PlayerDto } from "@/types/PlayerDto";
//
// const playerService = new PlayerService();
//
// export default nc<NextApiRequest, NextApiResponse>()
//   .get(async (req, res) => {
//     try {
//       const players = await playerService.getPlayers();
//       res.status(200).json(players);
//     } catch (e) {
//       console.error(e);
//       res.status(400).json("Error: Failed to retrieve all players");
//     }
//   })
//   .post(async (req, res) => {
//     try {
//       if (!req.body?.player) {
//         res.status(400).json("Invalid Player Object");
//       }
//
//       const player: PlayerDto = req.body.player;
//       await playerService.createPlayer(player);
//
//       res.status(201);
//     } catch (e) {
//       console.error(e);
//       res.status(400).json("Error: Failed to create new player");
//     }
//   });
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
      try {
        if (!req.body?.player) {
          res.status(400).json("Invalid Player Object");
        }

        const player: PlayerDto = req.body.player;
        await playerService.createPlayer(player);

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
