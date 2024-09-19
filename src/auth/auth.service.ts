import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private useService: UsersService,
        private jwtService: JwtService,
    ) {}
    
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.useService.findOne(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async register(email: string, password: string, role: string[]): Promise<any> {
        const user = await this.useService.createUser({ email, password, roles: role });
        return user;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.sub, roles: user.role }; 
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
