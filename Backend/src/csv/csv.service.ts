import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { CsvDTO } from "src/dto/CsvDTO";


@Injectable()
export class CSVService {
    constructor(private prisma: PrismaService) { }

    async createCSVData(data: CsvDTO) {
        return this.prisma.subArray.create({
            data: {
                number: data.number_subarray,
                id: data.id_subarray
            },
        });
    }

    async findAllCSVData() {
        const AllCSVData = await this.prisma.subArray.findMany();

        if (AllCSVData.length === 0) {
            throw new NotFoundException("No hay información en el momento");
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