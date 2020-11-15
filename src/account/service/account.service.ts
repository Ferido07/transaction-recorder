import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Account } from '../entities/account.entity';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { GetCurrencyService } from './get-currency.service';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { IAccountRepository } from '../interface/account-repository.interface';
import { DateRange } from 'src/common/date-range';
import { TransactionType } from '../transaction-type.enum';

@Injectable()
export class AccountService {

    constructor(
        @Inject('IAccountRepository') private readonly accountRepository: IAccountRepository,
        private readonly currencyService: GetCurrencyService,
    ) { }

    findAll(): Promise<Account[]> {
        return this.accountRepository.findAll();
    }

    findOne(id: number): Promise<Account> {
        return this.accountRepository.findByIdWithTransactionDateRange(id);
    }

    async createAccount(createAccountDto: CreateAccountDto) {
        // Check if currency exists
        const currency = await this.currencyService.getCurrency(createAccountDto.currencyId);

        if (currency && currency.id) {
            // Map CreateAccountDto DTO properties to Account entity properties
            const account: Account = new Account();
            account.accountType = createAccountDto.accountType;
            account.name = createAccountDto.name;
            account.description = createAccountDto.description;
            account.currency = currency;
            account.startBalance = createAccountDto.startBalance;
            account.balance = createAccountDto.startBalance;
            account.accountNo = createAccountDto.accountNo;

            // Save created Account entity and return
            return this.accountRepository.save(account);
        } else {
            throw new NotFoundException(`Currency with id ${createAccountDto.currencyId} not found.`);
        }
    }

    async updateAccount(id: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
        if (updateAccountDto.accountNo || updateAccountDto.description || updateAccountDto.name || updateAccountDto.accountState) {
            // Copy updateAccountDto to Account
            const account = await this.accountRepository.findByIdWithTransactionDateRange(id)
            if (account) {
                account.name = updateAccountDto.name ? updateAccountDto.name : account.name;
                account.description = updateAccountDto.description ? updateAccountDto.description : account.description;
                account.accountNo = updateAccountDto.accountNo ? updateAccountDto.accountNo : account.accountNo;
                account.accountState = updateAccountDto.accountState ? updateAccountDto.accountState : account.accountState;
                return this.accountRepository.save(account);
            } else {
                throw new NotFoundException(`Account with id ${id} not found`);
            }
        } else {
            throw new BadRequestException('No fields to update have been provided. Either name, description, accountState or accountNo must be provided for update');
        }
    }

    async delete(id: number): Promise<void> {
        const account: Account = await this.accountRepository.findByIdWithTransactionDateRange(id);
        await this.accountRepository.delete(account);
    }

    getAllTransactions(accountId: number): Promise<Transaction[]> {
        return this.getTransactionsByDate(accountId, new DateRange());
    }

    async getTransactionsByDate(accountId: number, dateRange?: DateRange): Promise<Transaction[]> {
        const account: Account = await this.accountRepository.findByIdWithTransactionDateRange(accountId, dateRange);
        return Promise.resolve(account.transactions);
    }

    async addTransaction(accountId: number, createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        // Check if account exists
        const account: Account = await this.accountRepository.findByIdWithTransactionDateRange(accountId);
        if (account) {
            // Convert CreateTransactionDto to Transaction
            const transaction = new Transaction();
            transaction.account = account;
            transaction.transactionType = createTransactionDto.transactionType;
            transaction.amount = createTransactionDto.amount;
            transaction.date = createTransactionDto.date && createTransactionDto.date.length > 0 ? new Date(createTransactionDto.date) : new Date();
            transaction.isTransfer = createTransactionDto.isTransfer;
            transaction.relatedTransferAccountId = createTransactionDto.relatedTransferAccountId;
            transaction.note = createTransactionDto.note;
            await this.accountRepository.saveTransaction(transaction);
            // update account balance
            if (transaction.transactionType === TransactionType.CREDIT) {
                account.balance += transaction.amount;
            } else {
                account.balance -= transaction.amount;
            }
            await this.accountRepository.save(account);
            // Return transaction with the account information
            return transaction;
        } else {
            throw new NotFoundException(`Account with is ${accountId} not found`);
        }

    }

    async removeTransaction(accountId: number, transactionId: number): Promise<void> {
        // Check if account exists
        const account: Account = await this.accountRepository.findByIdWithTransactionDateRange(accountId);
        if (account) {
            const transaction: Transaction = await this.accountRepository.findTransaction(accountId, transactionId);
            if (transaction) {
                await this.accountRepository.deleteTransaction(transaction);
                // adjust account balance
                if (transaction.transactionType === TransactionType.CREDIT) {
                    account.balance -= transaction.amount;
                } else {
                    account.balance += transaction.amount;
                }
                await this.accountRepository.save(account);
            }
        } else {
            throw new NotFoundException(`Account with is ${accountId} not found`);
        }
    }
}
