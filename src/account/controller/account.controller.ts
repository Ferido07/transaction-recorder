import { Controller, Get, Param, Post, Put, Delete, Body, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { AccountService } from '../service/account.service';
import { Account } from '../account.entity'
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';

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
}
