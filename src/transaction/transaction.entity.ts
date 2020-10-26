import { TransactionType } from "./transaction-type.enum";

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Account } from "src/account/account.entity";

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

    @Column()
    note?: string;

    @Column()
    isTransfer?: boolean;

    @Column()
    relatedTransferAccountId?: number;
}
