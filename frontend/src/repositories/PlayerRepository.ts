import { Db, ObjectId } from "mongodb";
import { Player } from "@/types/Player";
import { withMongo } from "@/src/mongo";

export default class PlayerRepository {
  async getPlayers(): Promise<Player[]> {
    return await withMongo(async (db: Db) => {
      return await db.collection<Player>("players").find({}).toArray();
    });
  }

  async getPlayer(id: string): Promise<Player | undefined> {
    const objectId = new ObjectId(id);

    return await withMongo(async (db: Db) => {
      return (await db.collection<Player>("players").findOne({ _id: objectId })) as Player;
    });
  }

  async createPlayer(player: Player): Promise<void> {
    return await withMongo(async (db: Db) => {
      await db.collection<Player>("players").insertOne(player);
    });
  }

  async updatePlayer(player: Player): Promise<void> {
    return withMongo(async (db: Db) => {
      await db.collection<Player>("players").updateOne({ _id: player._id }, player);
    });
  }

  async removePlayer(id: ObjectId): Promise<void> {
    return withMongo(async (db: Db) => {
      await db.collection<Player>("players").deleteOne({ _id: id });
    });
  }
}
