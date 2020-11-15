import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateCurrencyDto {
    @IsNotEmpty()
    @IsOptional()
    symbol?: string;

    @IsNotEmpty()
    @IsOptional()
    name?: string;
}