import {ObjectId} from "mongodb";
import {Player} from "@/types/Player";

export const stubPlayer: Player =
    {_id: new ObjectId('player-id-aa'), name: 'Player', username: 'Username', rating: 1000}
;