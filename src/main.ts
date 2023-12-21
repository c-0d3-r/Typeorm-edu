import 'module-alias/register';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory }    from '@nestjs/core';
// import { DataSource }     from 'typeorm';

// import { seedData }       from './@core/utils/seed-data';
import { AppModule }      from './app.module';

const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // const dataSource = app.get(DataSource);
  // await seedData(dataSource);

  await app.listen(process.env.PORT || DEFAULT_PORT);
}
bootstrap();
