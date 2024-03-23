import { Injectable }                   from '@nestjs/common';
import { InjectRepository }             from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Game, GameStatus }             from '../../domain/game.entity';
import { QueryPartialEntity }           from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class GamesRepository {
  public constructor(
    @InjectRepository(Game)
    private readonly games: Repository<Game>,
  ) {}

  public async getAllAndCount(): Promise<[Game[], number]> {
    try {
      const result = await this.games.findAndCount({
        order: {
          createdAt: 'DESC',
        },
      });

      return result;
    } catch (error) {
      console.log(error);

      return [[], 0];
    }
  }

  public async getOneById(id: number): Promise<Game> {
    try {
      const result = await this.games.findOne({
        where: { id },
      });

      return result;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  public async create(userId: number): Promise<Game> {
    try {
      const game = new Game();
      game.firstPlayerId = userId;
      const result = await this.games.save(game);

      return result;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  public async update(game: Game): Promise<Game> {
    try {
      return await this.games.save(game);
    } catch (error) {
      console.log(error);

      return game;
    }
  }

  public async updatePending(partial: QueryPartialEntity<Game>): Promise<void> {
    try {
      await this.games.update({ status: GameStatus.Pending }, partial);
    } catch (error) {
      console.log(error);
    }
  }

  public async getByQuery(
    partial: FindOptionsWhere<Game>,
  ): Promise<Game | null> {
    try {
      return await this.games.findOneBy(partial);
    } catch (error) {
      console.log(error);
    }
  }
}
