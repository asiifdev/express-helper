import { PrismaClient } from "@prisma/client";
import { findFirst } from "../repository/baseRepository.js";
import { SubscriptionsTable } from "../utils/prismaSchema.js";

const prisma = new PrismaClient({
    log: ['query']
});

const getInvoiceNumber = async () => {
    try {
        const query = `SELECT concat(:clients,RPAD(FLOOR(RAND() * 999999999999999), 15, \'0\')) AS invoice`;
        return await prisma.$queryRawUnsafe(query, "INV/");
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const invoiceNumber = async () => {
    try {
        let generateNumber = await getInvoiceNumber();
        let fetch = await findFirst(SubscriptionsTable, {
            where: {
                invoice: generateNumber[0].invoice
            }
        })
        while (fetch !== null) {
            generateNumber = await getInvoiceNumber();
            fetch = await findFirst(SubscriptionsTable, {
                where: {
                    invoice: generateNumber[0].invoice
                }
            })
        }
        return generateNumber[0].invoice;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export {
    invoiceNumber
}