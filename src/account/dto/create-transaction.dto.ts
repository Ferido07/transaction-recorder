import { IsBoolean, IsDate, IsDateString, IsEnum, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";
import { TransactionType } from "../transaction-type.enum";

export class CreateTransactionDto {

    @IsEnum(TransactionType)
    transactionType: TransactionType;

    @IsNumber()
    amount: number;

    @IsDateString()
    @IsOptional()
    date: string = Date.now().toString();

    @IsString()
    @IsOptional()
    note?: string;

    @IsBoolean()
    @IsOptional()
    isTransfer?: boolean;

    @ValidateIf(o => o.isTransfer === true)
    @IsNumber()
    relatedTransferAccountId?: number;
}
