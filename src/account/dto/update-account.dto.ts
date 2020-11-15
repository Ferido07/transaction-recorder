import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { AccountState } from "../account-state.enum";

export class UpdateAccountDto {

    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsNotEmpty()
    @IsOptional()
    description?: string;

    @IsEnum(AccountState)
    @IsOptional()
    accountState?: AccountState;

    @IsNotEmpty()
    @IsOptional()
    accountNo?: string;
}