import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const usersTable = prisma.users
const RolesTable = prisma.roles
const ClientCardsTable = prisma.client_cards
const clientsTable = prisma.clients
const packagesTable = prisma.packages
const itemsTable = prisma.items
const SubscriptionsTable = prisma.subscriptions
const packageItemsTable = prisma.package_items

export {
    prisma,
    usersTable,
    RolesTable,
    clientsTable,
    packagesTable,
    packageItemsTable,
    ClientCardsTable,
    itemsTable,
    SubscriptionsTable
}