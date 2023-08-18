import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    log: ['query'],
});

const dateNow = async () => {
    let result = await prisma.$queryRawUnsafe("select now() as date");
    return result[0].date
}

const addDays = async (day) => {
    let result = await prisma.$queryRawUnsafe(`SELECT DATE_ADD(now(), INTERVAL ${day} DAY) as date`);
    return result[0].date
}

export {
    dateNow,
    addDays
}