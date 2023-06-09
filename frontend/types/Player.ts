import { ObjectId } from "mongodb";

export type Player = {
  _id: ObjectId;
  name: string;
  username: string;
  city: string;
  rating: number;
};
