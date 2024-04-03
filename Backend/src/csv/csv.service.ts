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

    //Lectura del documento CSV
    // Se lee el archivo CSV
    // Se separa por saltos de línea (al abrirlo en un editor de texto se puede ver que cada número está en una línea diferente)
    // Se mapea cada número a un número entero y se filtran los 0
    data: number[] = fs
        .readFileSync(path.join('./src/csv/', 'data_vector.csv'), 'utf8')
        .split('\n')
        .map(Number)
        .filter((item) => item !== 0);

    // Función para crear un subarray con los números que sumen el número deseado
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
        // Se crea un array vacío para guardar los subarrays
        const subVectors: any[] = [];
        // Se crea un array vacío para guardar los números que sumen el número deseado
        let subVector: any[] = [];
        // Se crea una variable para guardar el número deseado (52)
        let currentTarget = target;
        // Se crea una variable para guardar el índice actual
        let i = 0;
        // Se recorre el array de números
        for (i; i < data.length; i++) {
            // Se guarda el valor actual
            const value = data[i];
            // Si el subarray incluye el valor actual, se continua con el siguiente número
            if (subVector.includes(value)) {
                continue;
            }
            // Se calcula la resta del número deseado menos el valor actual (como una cuenta regresiva)
            const currentResult = currentTarget - value;
            // Si el resultado es 0, se añade el valor actual al subarray (esto para ingresar solo un número que sume 52 y no pasarse)
            if (currentResult === 0) {
                // Se añade el valor actual al subarray
                subVector.push(value);
                // Se añade el subarray al array de subarrays
                subVectors.push(subVector);
                // Se crea un nuevo subarray en base de datos recorriendo el subvector antes de su limpieza
                for (let i = 0; i < subVector.length; i++) {
                    const subArray = subVector[i];
                    await this.createCSVData({ number: subArray, id: subVectors.length.toString() });
                }
                // Se limpia el target, para que sea nuevamente 52 o el número deseado
                currentTarget = target;
                // Se limpia el subarray original para no utilizar nuevamente números ya empleados
                data = data.filter((item: any) => !subVector.includes(item));
                // Se limpia el subarray que almacena los números sumados que den 52
                subVector = [];
                // Se reinicia el índice
                i = -1;

                continue;
            }
            // Si el resultado es mayor a 0, se añade el valor actual al subarray y se actualiza el target
            if (currentResult > 0) {
                subVector.push(value);

                currentTarget = currentResult;

                continue;
            }
            // Si el resultado es menor a 0, se limpia el subarray y se reinicia el índice
            if (currentResult < 0) {
                // Se limpia el subarray
                const newData = data.filter((item: any) => !subVector.includes(item));
                // Si el nuevo array no incluye ningún número que sume 52, se limpia el subarray y se reinicia el índice
                if (!newData.some((item: any) => item <= currentTarget)) {
                    // Se limpia el subarray (ese valor no nos sirve en el momento para ese subarray)
                    data.splice(0, 1);
                    // Se limpia el target
                    currentTarget = target;
                    // Se limpia el subarray
                    subVector = [];
                    // Se reinicia el índice
                    i = -1;
                }
            }
        }
        // Se retornan los subarrays generados al recorrer el arreglo que contiene todos los números del CSV
        return subVectors;
    };

    // Función para encontrar un número más óptimo que permita alcanzar la suma deseada
    async findAllCSVData() {
        const AllCSVData = await this.prisma.subArray.findMany();
        // Si no hay datos en la base de datos, se procesa el archivo CSV
        if (AllCSVData.length === 0) {
            try {
                // Se llama a la función getSubVectors para procesar el archivo CSV
                const subVectors = await this.getSubVectors(this.data, this.target);
                return `subVectors: ${subVectors}`
            } catch (error) {
                // Si hay un error al procesar el archivo CSV, se lanza una excepción
                throw new NotFoundException("Error al procesar el archivo CSV");
            }
        }
        // Se retornan los datos de la base de datos (en caso de existir información)
        return AllCSVData;
    }


    // Función para encontrar una combinación de números que den 52 apartir de un id
    async findCSVDataById(id: string) {
        // Se busca en la base de datos un subarray con el id proporcionado
        const subArrayById = await this.prisma.subArray.findMany({
            where: { id }
        });
        // Si no se encuentra ningún subarray con el id proporcionado, se lanza una excepción
        if (subArrayById.length === 0) {
            throw new NotFoundException("No hay ningun subarray con ese id");
        }

        // Se retorna el subarray encontrado
        return subArrayById;
    }
}