import { Module }        from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment }       from 'src/modules/comments/domain/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [],
  providers: [],
})
export class CommentsModule {}
