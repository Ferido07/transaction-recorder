import { Module } from '@nestjs/common';
import { TransactionService } from './service/transaction.service';
import { TransactionController } from './controller/transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { AccountModule } from 'src/account/account.module';


@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), AccountModule],
  providers: [TransactionService],
  controllers: [TransactionController]
})
export class TransactionModule { }
