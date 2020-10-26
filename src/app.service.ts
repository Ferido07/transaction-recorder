import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(private configService: ConfigService) { }

  getHello(): string {
    return 'Hello World!';
  }

  getHealth() {
    return {
      health: "OK",
      env: process.env,
      registeredConfigs: {
        DATABASE_HOST: this.configService.get('DATABASE_HOST'),
        DATABASE_PORT: this.configService.get('DATABASE_PORT'),
        DATABASE_USERNAME: this.configService.get('DATABASE_USERNAME'),
        DATABASE_PASSWORD: this.configService.get('DATABASE_PASSWORD'),
        DATABASE_NAME: this.configService.get('DATABASE_NAME'),
        DATABASE: this.configService.get('database'),
        port: this.configService.get('port')
      }
    }
  }
}
