import { PrismaClient } from '@prisma/client';
import { usersTable } from "../utils/prismaSchema.js";
import {findFirst, insertOne} from "./baseRepository.js";

const prisma = new PrismaClient({
    log: ['query'],
});

export const findByEmail = async (email) => {
    return usersTable.findMany({
        where: {
            email: {
                contains: email
            },
        },
    })
}

export const findByPhoneNumber = async (phoneNumber) => {
    return usersTable.findMany({
        where: {
            phone_number: {
                contains: phoneNumber
            },
        },
    })
}

export const getCustomerService = async () => {
    return await prisma.$queryRaw`
        select 
            phone_number,
            u.name
        from service_user.users u
        join service_user.roles r on r.id = u.role_id 
        where r.name = 'customer-service'
    `
}