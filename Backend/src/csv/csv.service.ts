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
        return this.prisma.subArray.findMany();
    }

    async findCSVDataById(id: string) {
        const subArrayById = await this.prisma.subArray.findMany({
            where: { id }
        });

        if (!subArrayById) {
            throw new NotFoundException("No hay ningun subarray con ese id");
        }

        return subArrayById;
    }


}