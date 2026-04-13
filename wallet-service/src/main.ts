import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  //setup microservice communication
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'wallet',
      protoPath: join(__dirname, '../proto/wallet.proto'),
      url: 'localhost:5002',
    }
  })

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3002);
  console.log('Wallet Service is running on port 3002');
}
bootstrap();
