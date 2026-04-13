import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'WALLET_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    package: 'wallet',
                    protoPath: join(__dirname, '../../proto/wallet.proto'),
                    url: 'localhost:5002',
                },
            },
        ]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}