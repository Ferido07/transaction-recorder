import { Injectable } from '@nestjs/common';
import { Transaction } from '../transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';

@Injectable()
export class TransactionService {

    constructor(@InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>) { }

    findAll(): Promise<Transaction[]> {
        return this.transactionRepository.find();
    }

    findOne(id: string): Promise<Transaction> {
        return this.transactionRepository.findOne(id);
    }

    create(createTransactionDto: CreateTransactionDto) {
        const transaction = new Transaction();
        // TODO: Convert CreateTransactionDto to Currency
        return this.transactionRepository.save(transaction);
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
