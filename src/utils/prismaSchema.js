import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const usersTable = prisma.users
const rolesTable = prisma.roles
const clientCardsTable = prisma.clientCards
const clientsTable = prisma.clients
const packagesTable = prisma.packages
const itemsTable = prisma.items

export {
    prisma,
    usersTable,
    rolesTable,
    clientsTable,
    packagesTable,
    clientCardsTable,
    itemsTable
}