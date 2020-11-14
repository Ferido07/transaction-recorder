import { InjectRepository } from "@nestjs/typeorm";
import { DateRange } from "src/common/date-range";
import { Between, Repository } from "typeorm";
import { Account } from "../entities/account.entity";
import { Transaction } from "../entities/transaction.entity";
import { IAccountRepository } from "../interface/account-repository.interface";

export class AccountRepository implements IAccountRepository {

    constructor(
        @InjectRepository(Account) private readonly accountRepository: Repository<Account>,
        @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>
    ) { }

    findAll(): Promise<Account[]> {
        return this.accountRepository.find();
    }

    async findByIdWithTransactionDateRange(id: number, dateRange?: DateRange): Promise<Account> {
        const account: Account = await this.accountRepository.findOne(id);

        if (dateRange) {
            // TODO: Needs fixing
            const transactions: Transaction[] = await this.transactionRepository.find();
            account.transactions = transactions;
        }

        return Promise.resolve(account);
    }

    save(account: Account): Promise<Account> {
        return this.accountRepository.save(account);
    }

    saveTransaction(accountOrTransaction: Account | Transaction): Promise<Transaction> {
        return this.transactionRepository.save(accountOrTransaction);
    }

    delete(account: Account): Promise<Account> {
        return this.accountRepository.remove(account);
    }

    deleteTransaction(transaction: Transaction): Promise<Transaction> {
        return this.transactionRepository.remove(transaction);
    }

    findTransaction(accountId: number, transactionId: number): Promise<Transaction> {
        return this.transactionRepository.findOne(transactionId);
    }
}
