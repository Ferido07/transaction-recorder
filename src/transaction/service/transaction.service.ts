import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from '../transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { Account } from 'src/account/account.entity';

@Injectable()
export class TransactionService {

    constructor(
        @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
        @InjectRepository(Account) private readonly accountRepository: Repository<Account>
    ) { }

    findAll(): Promise<Transaction[]> {
        return this.transactionRepository.find();
    }

    findOne(id: string): Promise<Transaction> {
        return this.transactionRepository.findOne(id);
    }

    async create(createTransactionDto: CreateTransactionDto) {
        const transaction = new Transaction();
        // Check if account exists
        const account: Account = await this.accountRepository.findOne(createTransactionDto.accountId);
        if (account) {
            // Convert CreateTransactionDto to Transaction
            transaction.account = account;
            transaction.transactionType = createTransactionDto.transactionType;
            transaction.amount = createTransactionDto.amount;
            transaction.date = createTransactionDto.date && createTransactionDto.date.length > 0 ? new Date(createTransactionDto.date) : new Date();
            transaction.isTransfer = createTransactionDto.isTransfer;
            transaction.relatedTransferAccountId = createTransactionDto.relatedTransferAccountId;
            transaction.note = createTransactionDto.note;
            // TODO: update account balance
            return this.transactionRepository.save(transaction);
        } else {
            throw new NotFoundException(`Account with is ${createTransactionDto.accountId} not found`);
        }

    }

    update(id: string, updateTransactionDto: UpdateTransactionDto) {
        const transaction = new Transaction();
        // TODO: Convert UpdateTransactionDto to Currency
        return this.transactionRepository.save(transaction);
    }

    async remove(id: string): Promise<void> {
        await this.transactionRepository.delete(id);
    }
}
