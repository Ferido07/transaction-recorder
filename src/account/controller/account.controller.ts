import { Controller, Get, Param, Post, Put, Delete, Body, ParseIntPipe, ValidationPipe, Query } from '@nestjs/common';
import { AccountService } from '../service/account.service';
import { Account } from '../entities/account.entity'
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { DateRange } from 'src/common/date-range';

@Controller('accounts')
export class AccountController {

    constructor(private readonly accountService: AccountService) { }

    @Get()
    getAll(): Promise<Account[]> {
        return this.accountService.findAll();
    }

    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number): Promise<Account> {
        return this.accountService.findOne(id);
    }

    @Post()
    createAccount(@Body(ValidationPipe) createAccountDto: CreateAccountDto): Promise<Account> {
        return this.accountService.createAccount(createAccountDto);
    }

    @Put(':id')
    updateAccount(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateAccountDto: UpdateAccountDto): Promise<Account> {
        return this.accountService.updateAccount(id, updateAccountDto);
    }

    @Delete(':id')
    deleteAccount(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.accountService.delete(id);
    }

    @Get(':accountId/transactions')
    getAllTransactions(
        @Param('accountId', ParseIntPipe) accountId: number,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string
    ): Promise<Transaction[]> {
        if (!startDate && !endDate) {
            return this.accountService.getAllTransactions(accountId);
        } else {
            return this.accountService.getTransactionsByDate(accountId, new DateRange(this.getDateFromDateString(startDate), this.getDateFromDateString(endDate)));
        }
    }

    private getDateFromDateString(dateString: string): Date {
        if (dateString && dateString.length > 0) {
            const date = new Date(dateString);
            return date.toString() === 'Invalid Date' ? undefined : date;
        } else {
            return undefined;
        }
    }

    @Post(':accountId/transactions')
    addTransaction(
        @Param('accountId', ParseIntPipe) accountId: number,
        @Body() createTransactionDto: CreateTransactionDto
    ): Promise<Transaction> {
        return this.accountService.addTransaction(accountId, createTransactionDto);
    }

    @Delete(':accountId/transactions/:transactionId')
    removeTransaction(
        @Param('accountId', ParseIntPipe) accountId: number,
        @Param('transactionId', ParseIntPipe) transactionId: number
    ): Promise<void> {
        return this.accountService.removeTransaction(accountId, transactionId);
    }
}
