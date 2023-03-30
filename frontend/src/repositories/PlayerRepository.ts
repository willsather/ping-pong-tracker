import clientPromise from "@/src/mongo/mongodb";
import { Db, MongoClient, ObjectId } from "mongodb";
import { Player } from "@/types/Player";

export default class PlayerRepository {
  private async connect(): Promise<Db> {
    const client: MongoClient = await clientPromise;
    return client.db(process.env.MONGO_DB_NAME);
  }

  async getPlayers(): Promise<Player[]> {
    const db = await this.connect();

    return await db.collection<Player>("Players").find({}).toArray();
  }

  async getPlayer(id: string): Promise<Player | undefined> {
    const db = await this.connect();
    const objectId = new ObjectId(id);

    return (await db.collection<Player>("Players").findOne({ _id: objectId })) as Player;
  }

  async createPlayer(player: Player): Promise<void> {
    const db = await this.connect();
    await db.collection<Player>("Players").insertOne(player);
  }

  async updatePlayer(player: Player): Promise<void> {
    const db = await this.connect();
    await db.collection<Player>("Players").updateOne({ _id: player._id }, player);
  }

  async removePlayer(id: ObjectId): Promise<void> {
    const db = await this.connect();
    await db.collection<Player>("Players").deleteOne({ _id: id });
  }
}
