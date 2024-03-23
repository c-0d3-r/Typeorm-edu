import { Module }          from '@nestjs/common';
import { TypeOrmModule }   from '@nestjs/typeorm';
import { Game }            from './domain/game.entity';
import { GamesController } from './controllers/games.controller';
import { GamesRepository } from './infrastructure/repositories/games.repository';
import { GamesService }    from './applicaton/games.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  controllers: [GamesController],
  providers: [GamesRepository, GamesService],
})
export class GamesModule {}
