import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

require('dotenv-flow').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const error_messages = errors.map(error =>
          Object.values(error.constraints),
        );
        return new BadRequestException(error_messages.toString());
      },
      forbidUnknownValues: false,
    }),
  );
  const PORT = process.env.NODE_DOCKER_PORT || 8081;
  console.log(`http://localhost:${PORT}/graphql`);
  await app.listen(PORT);
}
bootstrap();