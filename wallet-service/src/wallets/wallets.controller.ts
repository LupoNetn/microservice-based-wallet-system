import { Controller, Get, Param } from '@nestjs/common';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get(':userId')
  async getWallet(@Param('userId') userId: string) {
    return this.walletsService.getWallet(userId);
  }
}
