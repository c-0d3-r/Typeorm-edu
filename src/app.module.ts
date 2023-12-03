import { Module }                            from '@nestjs/common';
import { ConfigModule, ConfigService }       from '@nestjs/config';
import { TypeOrmModule }                     from '@nestjs/typeorm';

import { AppController }                     from './app.controller';
import databaseConf, { type DatabaseConfig } from './config/db.config';

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
  ],
  controllers: [AppController],
})
export class AppModule {}
