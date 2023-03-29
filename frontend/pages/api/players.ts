import clientPromise from "../../src/mongodb";

import type {NextApiRequest, NextApiResponse} from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "GET") {
        try {
            const client = await clientPromise;
            const db = client.db(process.env.DATABASE_NAME);

            const players = await db
                .collection("Players")
                .find({})
                .toArray();

            res.status(200).json(players);
        } catch (e) {
            console.error(e);
        }
    } else {
        return res.status(400).json("No Implementation Yet");
    }
}