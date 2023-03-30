import {Player} from "@/types/Player";
import PlayerRepository from "@/src/repositories/PlayerRepository";

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
}
