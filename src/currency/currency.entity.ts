import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Currency {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    symbol: string;

    @Column()
    name: string;

    @Column({ unique: true })
    code: string;
}
