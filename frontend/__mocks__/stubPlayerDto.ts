import { PlayerDto } from "@/types/PlayerDto";
import { Static } from "runtypes";

export const stubPlayerDto: Static<typeof PlayerDto> = {
  name: "Player",
  username: "Username",
  city: "Boston",
};
