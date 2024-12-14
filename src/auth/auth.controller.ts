import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async registerUser(
        @Body() { userName, password }: { userName: string; password: string },
    ) {
        return this.authService.register(userName, password);
    }

    @Post('login')
    async login(
        @Body() { userName, password }: { userName: string; password: string },
    ) {
        return this.authService.login(userName, password);
    }
}
