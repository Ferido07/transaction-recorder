import { Controller, Get, Param, Delete, Put, Body, Post, ParseIntPipe, ValidationPipe, HttpException } from '@nestjs/common';
import { CurrencyService } from '../service/currency.service';
import { Currency } from '../currency.entity';
import { CreateCurrencyDto } from '../dto/create-currency.dto';
import { UpdateCurrencyDto } from '../dto/update-currency.dto';

@Controller('currencies')
export class CurrencyController {

    constructor(private readonly currencyService: CurrencyService) { }

    @Get()
    getAll(): Promise<Currency[]> {
        return this.currencyService.findAll();
    }

    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number): Promise<Currency> {
        return this.currencyService.findOne(id);
    }

    @Post()
    create(@Body(ValidationPipe) createCurrencyDto: CreateCurrencyDto): Promise<Currency | HttpException> {
        return this.currencyService.create(createCurrencyDto);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateCurrencyDto: UpdateCurrencyDto): Promise<Currency> {
        return this.currencyService.update(id, updateCurrencyDto);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.currencyService.remove(id);
    }
}
