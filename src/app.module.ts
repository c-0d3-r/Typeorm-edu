import { Module }                            from '@nestjs/common';
import { ConfigModule, ConfigService }       from '@nestjs/config';
import { TypeOrmModule }                     from '@nestjs/typeorm';

import databaseConf, { type DatabaseConfig } from './@core/config/db.config';
import { AppController }                     from './app.controller';
import { CommentsModule }                    from './modules/comments/comments.module';
import { PostsModule }                       from './modules/posts/posts.module';
import { ProductsModule }                    from './modules/products/products.module';
import { UsersModule }                       from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConf],
    }),
    TypeOrmModule.forRootAsync({
      useFactory(config: ConfigService<DatabaseConfig>) {
        return config.get('database', {
          infer: true,
        });
      },
      inject: [ConfigService],
    }),
    PostsModule,
    UsersModule,
    CommentsModule,
    ProductsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
