import type {NextApiRequest, NextApiResponse} from "next";
import PlayerService from "@/src/services/PlayerService";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "GET") {
        try {
            const playerService = new PlayerService();
            const players = playerService.getPlayers();

            res.status(200).json(players);
        } catch (e) {
            console.error(e);
        }
    } else {
        return res.status(400).json("No Implementation Yet");
    }
}