import { Injectable } from "@nestjs/common";
import { Currency } from "src/currency/currency.entity";
import { CurrencyService as CurrencyServiceFromCurrency } from "../../currency/service/currency.service"

@Injectable()
export class GetCurrencyService {

    constructor(private readonly currencyServiceFromCurrency: CurrencyServiceFromCurrency) { }

    getCurrency(id: number): Promise<Currency> {
        return this.currencyServiceFromCurrency.findOne(id);
    }
}
