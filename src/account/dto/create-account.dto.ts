import { IsEnum, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { AccountState } from "../account-state.enum";
import { AccountType } from "../account-type.enum";

export class CreateAccountDto {

    @IsEnum(AccountType)
    accountType: AccountType;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsOptional()
    description?: string;

    @IsInt()
    @IsNotEmpty()
    currencyId: number;

    startBalance?: number;

    @IsEnum(AccountState)
    accountState: AccountState;

    @IsNotEmpty()
    @IsOptional()
    accountNo?: string;
}
