import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { GamesRepository }                    from '../infrastructure/repositories/games.repository';
import { Game }                               from '../domain/game.entity';
import { GamesService }                       from '../applicaton/games.service';

@Controller('games')
export class GamesController {
  public constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly gamesService: GamesService,
  ) {}

  @Post()
  public async create(@Body('userId') userId: number): Promise<Game> {
    return await this.gamesRepository.create(userId);
  }

  @Get()
  public async getAllAndCount(): Promise<[Game[], number]> {
    return await this.gamesRepository.getAllAndCount();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Game> {
    return await this.gamesRepository.getOneById(id);
  }

  @Post('join')
  async join(@Body('userId') userId: number): Promise<Game | null> {
    return await this.gamesService.join(userId);
  }
}
