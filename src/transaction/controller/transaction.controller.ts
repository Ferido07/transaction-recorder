import { Controller, Delete, Put, Get, Post, Param, Body } from '@nestjs/common';
import { TransactionService } from '../service/transaction.service';
import { Transaction } from '../transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';

@Controller('transactions')
export class TransactionController {

    constructor(private readonly transactionService: TransactionService) { }

    @Get()
    getAll(): Promise<Transaction[]> {
        return this.transactionService.findAll();
    }

    @Get(':id')
    get(@Param('id') id: string): Promise<Transaction> {
        return this.transactionService.findOne(id);
    }

    @Post()
    create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        return this.transactionService.create(createTransactionDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
        return this.transactionService.update(id, updateTransactionDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.transactionService.remove(id);
    }

}
