import * as fs from 'fs';
import { parse } from 'csv-parse';
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { CsvDTO } from "src/dto/CsvDTO";


@Injectable()
export class CSVService {
    constructor(private prisma: PrismaService) { }

    maxIterations: number = 100; // Límite máximo de iteraciones
    currentIterations: number = 0; // Número de iteraciones actual

    async createCSVData(data: CsvDTO) {
        return this.prisma.subArray.create({
            data: {
                number: data.number_subarray,
                id: data.id_subarray
            },
        });
    }

    // Función para encontrar un número más óptimo que permita alcanzar la suma deseada


    // const filePath = './src/csv/data_vector.csv';
    async processCSVData(filePath: string): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            const dataArray: string[] = [];
            fs.createReadStream(filePath)
                .pipe(parse({ delimiter: ',' }))
                .on('data', (row: any[]) => {
                    // Agregar cada valor del CSV al array
                    dataArray.push(row[0]);
                })
                .on('end', () => {
                    console.log('CSV file successfully processed', dataArray);
                    resolve(dataArray);
                })
                .on('error', (error: Error) => {
                    console.error('Error al leer el archivo CSV:', error);
                    reject(error);
                });
        });
    }

    async findAllCSVData() {
        const AllCSVData = await this.prisma.subArray.findMany();

        if (AllCSVData.length === 0) {
            try {
                const dataArray = await this.processCSVData('./src/csv/data_vector.csv');
                return dataArray;
            } catch (error) {
                throw new NotFoundException("Error al procesar el archivo CSV");
            }
        }

        return AllCSVData;
    }



    async findCSVDataById(id: string) {
        const subArrayById = await this.prisma.subArray.findMany({
            where: { id }
        });

        if (subArrayById.length === 0) {
            throw new NotFoundException("No hay ningun subarray con ese id");
        }

        return subArrayById;

    }


}