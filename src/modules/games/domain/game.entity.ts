import { BaseEntity }                from 'src/@core/entities/base.entity';
import { User }                      from 'src/modules/users/domain/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum GameStatus {
  Pending,
  InProgress,
  Finished,
}

@Entity()
export class Game extends BaseEntity {
  @ManyToOne('User', { nullable: true })
  public firstPlayer: User;

  @Column({ nullable: true })
  public firstPlayerId: number;

  @ManyToOne('User', { nullable: true })
  private secondPlayer: User;

  @Column({ nullable: true })
  public secondPlayerId: number;

  @Column({ enum: GameStatus, default: GameStatus.Pending })
  public status: GameStatus;
}
