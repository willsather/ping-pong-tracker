import { Player } from "@/types/Player";
import PlayerRepository from "@/src/repositories/PlayerRepository";
import { PlayerDto } from "@/types/PlayerDto";
import { ObjectId } from "mongodb";
import { Static } from "runtypes";

export default class PlayerService {
  private repository: PlayerRepository;

  constructor() {
    this.repository = new PlayerRepository();
  }

  async getPlayers(): Promise<Player[]> {
    return await this.repository.getPlayers();
  }

  async getPlayer(id: string): Promise<Player | undefined> {
    return await this.repository.getPlayer(id);
  }

  async createPlayer(playerDto: Static<typeof PlayerDto>): Promise<void> {
    const player = PlayerService.convertPlayerDto(playerDto);
    return await this.repository.createPlayer(player);
  }

  async updatePlayer(playerDto: Static<typeof PlayerDto>, id: string): Promise<void> {
    const player = PlayerService.convertPlayerDto(playerDto, new ObjectId(id));
    return await this.repository.updatePlayer(player);
  }

  async removePlayer(id: string): Promise<void> {
    return await this.repository.removePlayer(new ObjectId(id));
  }

  private static convertPlayerDto(
    playerDto: Static<typeof PlayerDto>,
    id: ObjectId = new ObjectId(),
    rating = 1000
  ): Player {
    return {
      _id: id,
      name: playerDto.name,
      username: playerDto.username,
      city: playerDto.city,
      rating: rating,
    };
  }
}
