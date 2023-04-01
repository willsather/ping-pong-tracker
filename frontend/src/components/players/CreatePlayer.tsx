import PlayerClient from "@/src/clients/PlayerClient";
import { PlayerDto } from "@/types/PlayerDto";
import { Static } from "runtypes";

const CreatePlayer = ({ playerClient }: { playerClient: PlayerClient }) => {
  const onClick = async () => {
    const playerDto: Static<typeof PlayerDto> = {
      name: "asdf",
      username: "fakeUsername",
      city: "Boston",
    };
    await playerClient.createPlayer(playerDto);
  };
  return (
    <div>
      <h4>Create a new player</h4>
      <button onClick={onClick}>Add Player</button>
    </div>
  );
};

export default CreatePlayer;
