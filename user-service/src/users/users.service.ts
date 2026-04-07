import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDto } from "./types";

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(data: CreateUserDto) {
        return this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: data.password,
            }
        });
    }
}