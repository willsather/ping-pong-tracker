import clientPromise from "../../src/mongodb";

export default async (req: any, res: any) => {
    try {
        const client = await clientPromise;
        const db = client.db("PingPongTracker");

        const movies = await db
            .collection("Players")
            .find({})
            .toArray();

        res.json(movies);
    } catch (e) {
        console.error(e);
    }
};