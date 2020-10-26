import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import { DatabaseConfigModule } from './database-config/database-config.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [databaseConfig],
            isGlobal: true
        }),
        DatabaseConfigModule]
})
export class ConfigurationModule { }
