import { Module } from '@nestjs/common';
import { CurrencyController } from './controller/currency.controller';
import { CurrencyService } from './service/currency.service';
import { Currency } from './currency.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Currency])],
  controllers: [CurrencyController],
  providers: [CurrencyService],
  exports: [CurrencyService, TypeOrmModule]
})
export class CurrencyModule { }
