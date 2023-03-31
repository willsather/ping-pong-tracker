import React from "react";
import PlayerClient from "@/src/clients/PlayerClient";
import Players from "@/src/components/players/Players";
import CreatePlayer from "@/src/components/players/CreatePlayer";

export default function Home() {
  const playerClient = new PlayerClient();

  return (
    <div>
      <h1>Ping Pong Tracker</h1>
      <div>
        <Players playerClient={playerClient} />
        <CreatePlayer />
      </div>
    </div>
  );
}
