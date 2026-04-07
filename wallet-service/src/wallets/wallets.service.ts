import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletsService {
  constructor(private readonly prisma: PrismaService) {}

  async createWallet(userId: string) {
    return this.prisma.wallet.create({
      data: {
        userId,
        balance: 0,
      },
    });
  }

  async getWallet(userId: string) {
    return this.prisma.wallet.findUnique({
      where: { userId },
    });
  }
}
