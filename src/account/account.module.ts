import { Module } from '@nestjs/common';
import { AccountController } from './controller/account.controller';
import { AccountService } from './service/account.service';
import { Account } from './account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetCurrencyService } from './service/get-currency.service';
import { CurrencyService as CurrencyServiceFromCurrencyModule } from '../currency/service/currency.service';
import { CurrencyModule } from 'src/currency/currency.module';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), CurrencyModule],
  controllers: [AccountController],
  providers: [AccountService, GetCurrencyService, CurrencyServiceFromCurrencyModule]
})
export class AccountModule { }
