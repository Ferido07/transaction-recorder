import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from '../account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { GetCurrencyService } from './get-currency.service';

@Injectable()
export class AccountService {


    constructor(
        @InjectRepository(Account) private readonly accountRepository: Repository<Account>,
        private readonly currencyService: GetCurrencyService
    ) { }

    findAll(): Promise<Account[]> {
        return this.accountRepository.find();
    }

    findOne(id: number): Promise<Account> {
        return this.accountRepository.findOne(id);
    }

    async createAccount(createAccountDto: CreateAccountDto) {
        // TODO: Check if currency exists
        const currency = await this.currencyService.getCurrency(createAccountDto.currencyId);
        if (currency === null || currency === undefined) {
            throw new NotFoundException(`Currency with id ${createAccountDto.currencyId} not found.`);
        }

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
    }

    updateAccount(id: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
        const account = new Account();
        // TODO: Convert updateAccountDto to Account
        return this.accountRepository.save(account);
    }

    async delete(id: number): Promise<void> {
        await this.accountRepository.delete(id);
    }


    /*
    set StartBalance(startBalance: number) {
        this.startBalance = startBalance;
        this.recalculateBalance();
    }
   
    withdraw(amount: Amount, date?: Date, note?: string) {
        if (amount.Currency === this.currency) {
            if (this.balance >= amount.Amount) { //TODO: this check may cause bugs and maybe unnecessary
                const transaction = new Transaction(null, this.id, TransactionType.DEBIT, amount, date, note);
                transaction.TrackingState = TrackingState.ADDED;
                this.transactions.push(transaction);
                this.balance = this.balance - amount.Amount;
            } else {
                throw new Error("Account balance is lower than withdrawal amount");
            }
        } else {
            throw new Error(`Account currency ${this.currency} does not match given currency ${amount.Currency}`);
        }
    }

    deposit(amount: Amount, date?: Date, note?: string) {
        if (amount.Currency === this.currency) {
            const transaction = new Transaction(null, this.id, TransactionType.CREDIT, amount, date, note);
            transaction.TrackingState = TrackingState.ADDED;
            this.transactions.push(transaction);
            this.balance = this.balance - amount.Amount;
        } else {
            throw new Error(`Account currency ${this.currency} does not match given currency ${amount.Currency}`);
        }
    }

    deleteTransaction(transaction: Transaction) {
        const transactionToBeDeleted = this.transactions.find(tra => tra.Id === transaction.Id);
        if (transactionToBeDeleted) {
            transactionToBeDeleted.TrackingState = TrackingState.DELETED;
        }
        // calculate balance
    }

    calculateDifference(): number {
        let change = 0;
        let transactions: Transaction[];
        if (this.dateRange === undefined) {
            transactions = this.transactions;
        } else {
            transactions = this.transactions.filter(
                transaction => (this.dateRange as DateRange).isDateWithinRange(transaction.Date)
            );
        }

        transactions.forEach(transaction => {
            if (transaction.TransactionType === TransactionType.CREDIT) {
                change += transaction.Amount.Amount;
            } else {
                change -= transaction.Amount.Amount;
            }
        });
        return change;
    }

    private recalculateBalance() {
        this.balance = this.startBalance + this.calculateDifference();
        // TODO mark some problem if the balance is below 0
    }
    */
}
