import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { CommonModule } from './common/common.module';
import { CurrencyModule } from './currency/currency.module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [
    ConfigurationModule, AccountModule, CommonModule, CurrencyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
