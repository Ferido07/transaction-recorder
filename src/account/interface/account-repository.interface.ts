import { DateRange } from "src/common/date-range";
import { Account } from "../entities/account.entity";
import { Transaction } from "../entities/transaction.entity";

export interface IAccountRepository {
    findAll(): Promise<Account[]>;
    findByIdWithTransactionDateRange(id: number, dateRange?: DateRange): Promise<Account>;
    save(account: Account): Promise<Account>;
    saveTransaction(transaction: Transaction): Promise<Transaction>;
    delete(account: Account): Promise<Account>;
    deleteTransaction(transaction: Transaction): Promise<Transaction>;
    findTransaction(accountId: number, transactionId: number): Promise<Transaction>;
}
