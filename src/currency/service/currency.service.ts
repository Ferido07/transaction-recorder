import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Currency } from '../currency.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCurrencyDto } from '../dto/create-currency.dto';
import { UpdateCurrencyDto } from '../dto/update-currency.dto';

@Injectable()
export class CurrencyService {

    constructor(@InjectRepository(Currency) private readonly currencyRepository: Repository<Currency>) { }

    findAll(): Promise<Currency[]> {
        return this.currencyRepository.find();
    }

    findOne(id: number): Promise<Currency> {
        return this.currencyRepository.findOne(id);
    }

    async create(createCurrencyDto: CreateCurrencyDto) {
        const currencyFromDb = await this.currencyRepository.findOne({ code: createCurrencyDto.code });

        // Check if currency exists
        if (!currencyFromDb && currencyFromDb.id) {
            // Currency exists
            throw new HttpException(`Currency already exists with id ${currencyFromDb.id}`, HttpStatus.SEE_OTHER);
            // TODO: Replace exception in service layer so that it returns business logic related exception rather
            //  than HTTP Exception. That exception handler should add the Location Header field with route to the 
            //  exsiting currency
        } else {
            // Currency does not exist

            // Convert CreateCurrencyDto to Currency
            const currency = new Currency();
            currency.code = createCurrencyDto.code;
            currency.name = createCurrencyDto.name;
            currency.symbol = createCurrencyDto.symbol;

            // Save and return the created currency
            return this.currencyRepository.save(currency);
        }

    }

    update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
        const currency = new Currency();
        // TODO: Convert CreateCurrencyDto to Currency
        return this.currencyRepository.save(currency);
    }

    async remove(id: number): Promise<void> {
        await this.currencyRepository.delete(id);
    }
}
