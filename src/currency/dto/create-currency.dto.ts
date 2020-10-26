import { IsNotEmpty } from "class-validator";

export class CreateCurrencyDto {

    @IsNotEmpty()
    symbol: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    code: string;
}
