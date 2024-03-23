import { Injectable }       from '@nestjs/common';
import { Game, GameStatus } from '../domain/game.entity';
import { DataSource }       from 'typeorm';
import { GamesRepository }  from '../infrastructure/repositories/games.repository';

@Injectable()
export class GamesService {
  public constructor(
    private dataSource: DataSource,
    private readonly gamesRepository: GamesRepository,
  ) {}

  public async join(userId: number): Promise<Game | null> {
    // Bad
    const game = await this.gamesRepository.getByQuery({
      status: GameStatus.Pending,
    });

    if (!game) return null;

    // This delay is made so you can do two "simultaneous" requests at the same time
    // through Postman or any other HTTP client to see race conditions
    await new Promise((r) => setTimeout(r, 5000));

    game.status = GameStatus.InProgress;
    game.secondPlayerId = userId;

    return await this.gamesRepository.update(game);

    // return await this.solution1(userId);
    // return await this.solution2(userId);
  }

  private async solution1(userId: number): Promise<Game | null> {
    // Solution #1 with transactions
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const game = await queryRunner.manager.findOne(Game, {
        where: { status: GameStatus.Pending },
        // "magic"
        lock: { mode: 'pessimistic_write' },
      });
      if (!game) return null;
      await new Promise((r) => setTimeout(r, 5000));
      game.status = GameStatus.InProgress;
      game.secondPlayerId = userId;
      await queryRunner.manager.save(game);
      await queryRunner.commitTransaction();
      return game;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return null;
    } finally {
      await queryRunner.release();
    }
  }

  private async solution2(userId: number): Promise<Game | null> {
    // Solution #2
    await new Promise((r) => setTimeout(r, 5000));

    const query = {
      status: GameStatus.InProgress,
      secondPlayerId: userId,
    };

    await this.gamesRepository.updatePending(query);

    return await this.gamesRepository.getByQuery(query);
  }
}
