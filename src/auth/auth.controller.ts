import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post("register")
    async register(@Body() body:{email:string, password:string, role:string[]}){
        const user = await this.authService.register(body.email, body.password, body.role);
        return user;
    }
    @Post("login")
    async login(@Body() body:{email:string, password:string}) {
        const user = await this.authService.validateUser(body.email, body.password);
        if(!user){
            throw new UnauthorizedException("Invalid Credentials");
        }
        return this.authService.login(user);
    }
}
