import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { CSVService } from './csv.service';
import { ApiTags } from '@nestjs/swagger';
import { CsvDTO } from 'src/dto/CsvDTO';

// Se importa el decorador ApiTags de Swagger
@ApiTags('CSV')
// Se define el controlador CSV (/csv)
@Controller('csv')
export class CSVController {
    constructor(private readonly csvService: CSVService) { }

    // Variables para la función POST para crear valores asignados a un id
    @Post()
    @HttpCode(HttpStatus.CREATED)
    createCSV(@Body() counselorData: CsvDTO) {
        return this.csvService.createCSVData(counselorData);
    }

    // Variables para la función GET para obtener todos los valores
    @Get()
    findAllCSVs() {
        return this.csvService.findAllCSVData();
    }

    // Variables para la función GET para obtener un valor por id específico
    @Get(':id')
    findCSVById(@Param('id') id: string) {
        return this.csvService.findCSVDataById(id);
    }
}