import { Player } from "@/types/Player";
import { PlayerDto } from "@/types/PlayerDto";

export default class PlayerClient {
  getPlayers(): Promise<Player[]> {
    return fetch("/api/players", {
      method: "GET",
    }).then((res) => res.json());
  }

  createPlayer(player: PlayerDto): Promise<void> {
    return fetch(`/api/players`, {
      method: "POST",
      body: JSON.stringify({ player }),
    }).then((res) => res.json());
  }

  getPlayer(id: string): Promise<Player> {
    return fetch(`/api/players/${id}`, {
      method: "GET",
    }).then((res) => res.json());
  }

  updatePlayer(player: PlayerDto, id: string): Promise<void> {
    return fetch(`/api/players/${id}`, {
      method: "PUT",
      body: JSON.stringify({ player }),
    }).then((res) => res.json());
  }

  removePlayer(id: string): Promise<void> {
    return fetch(`/api/players/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  }
}
