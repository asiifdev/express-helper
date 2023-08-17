import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    log: ['query'],
});

const dateNow = async() => {
    let result = await prisma.$queryRawUnsafe("select now() as date");
    return result[0].date
}

export {
    dateNow
}