import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { CSVService } from './csv.service';
import { ApiTags } from '@nestjs/swagger';
import { CsvDTO } from 'src/dto/CsvDTO';

@ApiTags('CSV')
@Controller('csv')
export class CSVController {
    constructor(private readonly csvService: CSVService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createCSV(@Body() counselorData: CsvDTO) {
        return this.csvService.createCSVData(counselorData);
    }

    @Get()
    findAllCSVs() {
        return this.csvService.findAllCSVData();
    }

    @Get(':id')
    findCSVById(@Param('id') id: string) {
        return this.csvService.findCSVDataById(id);
    }


}