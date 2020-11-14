import { TransactionType } from "../transaction-type.enum";

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Account } from "src/account/entities/account.entity";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Account, account => account.transactions)
    account: Account;

    @Column({
        type: "enum",
        enum: TransactionType,
        default: TransactionType.DEBIT
    })
    transactionType: TransactionType;

    @Column()
    amount: number;

    @Column()
    date: Date;

    @Column({ default: null })
    note?: string;

    @Column({ default: false })
    isTransfer?: boolean;

    @Column({ default: null })
    relatedTransferAccountId?: number;
}
