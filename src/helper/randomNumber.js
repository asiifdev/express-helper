import { PrismaClient } from "@prisma/client";
import { findFirst } from "../repository/baseRepository.js";
import { clientsTable } from "../utils/prismaSchema.js";

const prisma = new PrismaClient({
    log: ['query']
});

const getRandomMidByType = async () => {
    try {
        const query = `SELECT concat(:clients,RPAD(FLOOR(RAND() * 999999999999999), 6, \'0\')) AS client_id`;
        return await prisma.$queryRawUnsafe(query, "WTK");
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const randomNumber = async () => {
    try {
        let generateNumber = await getRandomMidByType();
        let fetch = await findFirst(clientsTable, {
            where: {
                id: generateNumber[0].client_id
            }
        })
        while (fetch !== null) {
            generateNumber = await getRandomMidByType();
            fetch = await findFirst(clientsTable, {
                where: {
                    id: generateNumber[0].client_id
                }
            })
        }
        return generateNumber[0].client_id;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export {
    randomNumber
}