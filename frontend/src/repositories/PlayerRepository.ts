import clientPromise from "@/src/mongo/mongodb";
import {Db, MongoClient, ObjectId} from "mongodb";
import {Player} from "@/types/Player";

export default class PlayerRepository {

    constructor() {
    }

    async getPlayers(): Promise<Player[]> {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db(process.env.MONGO_DB_NAME);

        return await db
            .collection<Player>("Players")
            .find({})
            .toArray();
    }

    async getPlayer(id: string): Promise<Player | undefined> {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db(process.env.MONGO_DB_NAME);

        const objectId = new ObjectId(id);

        return await db
            .collection<Player>("Players")
            .findOne({_id:objectId}) as Player;
    }
}