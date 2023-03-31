import { Record, String } from "runtypes";

export const PlayerDto = Record({
  name: String,
  username: String,
  city: String,
});
