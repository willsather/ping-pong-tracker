import React, { useEffect, useState } from "react";
import { Player } from "@/types/Player";
import Loading from "@/src/components/util/Loading";
import PlayerClient from "@/src/clients/PlayerClient";

const Players = ({ playerClient }: { playerClient: PlayerClient }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const getAllPlayers = async () => {
      setPlayers(await playerClient.getPlayers());
      setLoading(false);
    };

    getAllPlayers().catch(console.error);
  }, [playerClient]);

  if (loading) {
    return <Loading />;
  }

  if (!players) {
    return <p>No Players Available</p>;
  }

  return (
    <div>
      {players.map((player) => {
        return <p key={player._id.toString()}>{player.name}</p>;
      })}
    </div>
  );
};

export default Players;
