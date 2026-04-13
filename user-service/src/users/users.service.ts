import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDto } from "./types";
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

interface WalletService {
  createWallet(data: { userId: string; currency: string }): Observable<any>;
}

@Injectable()
export class UsersService implements OnModuleInit {
    private walletService: WalletService;

    constructor(
        private readonly prisma: PrismaService,
        @Inject('WALLET_PACKAGE') private client: ClientGrpc,
    ) {}

    onModuleInit() {
        this.walletService = this.client.getService<WalletService>('WalletService');
    }

    async createUser(data: CreateUserDto) {
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: data.password,
            }
        });

        // Trigger wallet creation via gRPC
        try {
            await firstValueFrom(this.walletService.createWallet({ 
                userId: user.id, 
                currency: 'NGN' // Default currency
            }));
            console.log(`Wallet created for user ${user.id}`);
        } catch (error) {
            console.error('Failed to create wallet:', error);
        }

        return user;
    }
}