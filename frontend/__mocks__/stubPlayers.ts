import { ObjectId } from "mongodb";
import { Player } from "@/types/Player";

export const stubPlayers: Player[] = [
  { _id: new ObjectId("player-id-aa"), name: "Player 1", username: "Username 1", rating: 1000 },
  { _id: new ObjectId("player-id-bb"), name: "Player 2", username: "Username 2", rating: 1500 },
];
