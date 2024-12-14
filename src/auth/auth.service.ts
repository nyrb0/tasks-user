import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}
    async register(userName: string, password: string) {
        // хэширование пароля
        const hashPass = await bcrypt.hash(password, 10);
        // Создаем пользователя
        const user = await this.prisma.user.create({
            data: {
                userName,
                password: hashPass,
            },
        });
        return user;
    }

    async login(userName: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { userName } });
        if (!user) throw new UnauthorizedException('Пользователь не найден');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            throw new UnauthorizedException('Неверный пароль');
        const payload = {
            userId: user.id,
            userName: user.userName,
        };
        const token = this.jwtService.sign(payload);
        return { token };
    }
}
