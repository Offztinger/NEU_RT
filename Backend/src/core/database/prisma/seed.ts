// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//     await prisma.roles.create({
//         data: {
//             roleName: "Estudiante",
//             roleDescription: "Estudiante",
//         },
//     });

//     await prisma.roles.create({
//         data: {
//             roleName: "Profesor",
//             roleDescription: "Profesor",
//         },
//     });

//     await prisma.roles.create({
//         data: {
//             roleName: "Asesor",
//             roleDescription: "Asesor",
//         },
//     });

//     await prisma.roles.create({
//         data: {
//             roleName: "Coordinador",
//             roleDescription: "Coordinador",
//         },
//     });
// }

// main()
//     .catch((e) => {
//         throw e;
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });