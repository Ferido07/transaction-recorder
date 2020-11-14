import { Module } from '@nestjs/common';
import { AccountController } from './controller/account.controller';
import { AccountService } from './service/account.service';
import { Account } from './entities/account.entity';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetCurrencyService } from './service/get-currency.service';
import { CurrencyService as CurrencyServiceFromCurrencyModule } from '../currency/service/currency.service';
import { CurrencyModule } from 'src/currency/currency.module';
import { AccountRepository } from './repository/account-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), TypeOrmModule.forFeature([Transaction]), CurrencyModule],
  controllers: [AccountController],
  providers: [AccountService, GetCurrencyService, CurrencyServiceFromCurrencyModule,
    {
      provide: 'IAccountRepository',
      useClass: AccountRepository
    }
  ],
  exports: [TypeOrmModule]
})
export class AccountModule { }
