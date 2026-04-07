import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [PrismaModule, WalletsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
