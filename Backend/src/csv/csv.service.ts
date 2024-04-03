import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { CsvDTO } from "src/dto/CsvDTO";
import * as fs from 'fs';
import path = require('path');

@Injectable()
export class CSVService {
    constructor(private prisma: PrismaService) { }
    // Variables para la función getSubVectors
    target: number = 52;

    data: number[] = fs
        .readFileSync(path.join('./src/csv/', 'data_vector.csv'), 'utf8')
        .split('\n')
        .map(Number)
        .filter((item) => item !== 0);

    async createCSVData(data: CsvDTO) {
        return this.prisma.subArray.create({
            data: {
                number: data.number,
                id: data.id
            },
        });
    }

    // Función para encontrar un número más óptimo que permita alcanzar la suma deseada

    getSubVectors = async (data: any, target: any) => {
        const subVectors: any[] = [];

        let subVector: any[] = [];

        let currentTarget = target;

        let i = 0;

        for (i; i < data.length; i++) {
            const value = data[i];

            if (subVector.includes(value)) {
                continue;
            }

            const currentResult = currentTarget - value;

            if (currentResult === 0) {
                subVector.push(value);

                subVectors.push(subVector);

                for (let i = 0; i < subVector.length; i++) {
                    const subArray = subVector[i];
                    await this.createCSVData({ number: subArray, id: subVectors.length.toString() });
                }

                currentTarget = target;

                data = data.filter((item: any) => !subVector.includes(item));

                subVector = [];

                i = -1;

                continue;
            }

            if (currentResult > 0) {
                subVector.push(value);

                currentTarget = currentResult;

                continue;
            }

            if (currentResult < 0) {
                const newData = data.filter((item: any) => !subVector.includes(item));

                if (!newData.some((item: any) => item <= currentTarget)) {
                    data.splice(0, 1);

                    currentTarget = target;

                    subVector = [];

                    i = -1;
                }
            }
        }

        return subVectors;
    };

    async findAllCSVData() {
        const AllCSVData = await this.prisma.subArray.findMany();

        if (AllCSVData.length === 0) {
            try {
                const subVectors = this.getSubVectors(this.data, this.target);
                console.log("subVectors: ", await subVectors);
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