import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    get(key: string): string {
        const config = {
            JWT_SECRET: 'nest-js',
        };
        return config[key];
    }
}
