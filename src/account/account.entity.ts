import { AccountType } from "./account-type.enum";
import { Transaction } from "../transaction/transaction.entity";
import { Currency } from "src/currency/currency.entity";

import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';

import { DateRange } from "src/common/date-range";
import { AccountState } from "./account-state.enum";

@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: AccountType,
        default: AccountType.OWNER
    })
    accountType: AccountType;

    @Column()
    name: string;

    @Column({ default: null })
    description?: string;

    @ManyToOne(() => Currency)
    currency: Currency;

    @Column({ default: 0 })
    startBalance: number;

    @Column()
    balance: number;

    @CreateDateColumn()
    dateCreated: Date;

    @Column({
        type: "enum",
        enum: AccountState,
        default: AccountState.ACTIVE
    })
    accountState: AccountState;

    @Column({ default: null })
    accountNo?: string;

    @OneToMany(() => Transaction, trasaction => trasaction.account)
    transactions: Transaction[];

    dateRange?: DateRange;
}
