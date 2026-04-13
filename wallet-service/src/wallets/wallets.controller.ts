import { Controller, Get, Param } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { GrpcMethod } from '@nestjs/microservices';

// Manually define interfaces to match your proto messages
interface CreateWalletRequest {
  userId: string;
  currency: string;
}

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @GrpcMethod('WalletService', 'CreateWallet')
  async createWallet(data: CreateWalletRequest) {
    const wallet = await this.walletsService.createWallet(data.userId, data.currency);
    
    return {
      walletId: wallet.id,
      userId: wallet.userId,
      currency: wallet.currency,
      balance: Number(wallet.balance),
      isActive: wallet.isActive,
      createdAt: wallet.createdAt.toISOString(),
    };
  }

  @Get(':userId')
  async getWallet(@Param('userId') userId: string) {
    return this.walletsService.getWallet(userId);
  }
}
