import { randomNumber } from "../helper/randomNumber.js"
import { findFirst, insertOne, updateOne } from "../repository/baseRepository.js"
import { InternalServerError, Ok, badRequest } from "../utils/httpStatus.js"
import bcrtpt from "bcryptjs"
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import { dateNow } from "../helper/dateNow.js";
import { parsePaginationToQueryParams } from "../utils/queryUtil.js";
import { paginateData } from "../utils/dataResponseUtil.js";
import { getLink, getSomeProperties } from "../utils/objectUtil.js";

const prisma = new PrismaClient({
    log: ['query'],
});

const createHelper = async (payload, table, randomNumberId = false, useUuid = false) => {
    try {
        let relations;
        let tableName = table.name
        let columns = await prisma.$queryRawUnsafe(`SHOW COLUMNS FROM ${tableName}`);
        let insertData = {}
        let data = {}

        payload.created_at = await dateNow()
        payload.updated_at = await dateNow()
        if (useUuid) {
            payload.id = uuidv4()
        }
        if (randomNumberId) {
            payload.id = await randomNumber()
        }
        if (payload.password) {
            let newPass = await bcrtpt.hash(payload.password, 10).then(hash => {
                return hash
            })
            payload.password = newPass
        }

        if (payload.email) {
            let checkEmail = await findFirst(table, {
                where: {
                    email: payload.email
                }
            })
            if (checkEmail) return response(badRequest, "failed", "email already exist");
        }

        for (let key in columns) {
            let columName = columns[key].Field
            let changeName = false;
            if (columName.includes('_id')) {
                relations = { ...relations }
                changeName = columName.replace('_id', 's')
                relations[changeName] = true
            }
            if (changeName) {
                insertData[changeName] = {
                    connect: {
                        id: payload[columName]
                    }
                }
            }
            else {
                insertData[columName] = payload[columName]
            }
        }

        if (!relations || relations == undefined) {
            data = await insertOne(table, insertData)
        }
        else {
            data = await insertOne(table, insertData, relations)
        }

        return response(Ok, "success", "created Successfully", data)
    } catch (error) {
        console.log(error)
        return response(InternalServerError, 'Failed', "Somethink wronk");
    }
}

const getHelper = async (payload, table, req, relations) => {
    let params = [];
    let where = {}
    let select = {}
    let tableName = table.name
    let columns = await prisma.$queryRawUnsafe(`SHOW COLUMNS FROM ${tableName}`);
    let isdeleted = await prisma.$queryRawUnsafe(`SHOW COLUMNS FROM ${tableName} LIKE 'isdeleted'`);
    payload.page = payload.page && payload.page !== '' ? parseInt(payload.page) : 1;
    payload.per_page = payload.per_page && payload.per_page !== '' ? parseInt(payload.per_page) : 10;
    const { take, skip } = parsePaginationToQueryParams(payload)

    try {
        for (let key in columns) {
            let columName = columns[key].Field
            let changeName = false;
            if (columName == 'password') select[columName] = false
            if (payload[columName]) {
                where[columName] = {
                    contains: payload[columName]
                }
            }
            if (columName.includes('_id')) {
                changeName = columName.replace('_id', 's')
                if (payload[columName] && payload[columName] != "") {
                    let checkIdType = await prisma.$queryRawUnsafe(`SHOW COLUMNS FROM ${changeName} WHERE Field = 'id'`)
                    checkIdType = checkIdType[0].Type
                    console.log(checkIdType)
                    if (checkIdType == 'int') {
                        where[columName] = parseInt(payload[columName])
                    }
                    else {
                        where[columName] = payload[columName]
                    }
                }
                select[changeName] = true
            }
            else {
                select[columName] = true
            }
        }
        if (payload.email) {
            where.email = {
                contains: payload.email
            }
        }
        if (payload.name) {
            where.name = {
                contains: payload.name
            }
        }
        if (payload.holder) {
            where.holder = {
                contains: payload.holder
            }
        }
        if (payload.client_id) {
            where.client_id = {
                contains: payload.client_id
            }
        }
        if (payload.is_addon) {
            where.is_addon = payload.is_addon || payload.is_addon == "true" ? true : false
        }
        if (payload.is_package) {
            where.is_package = payload.is_package || payload.is_package == "true" ? true : false
        }
        if (payload.status) {
            where.status = payload.status
        }
        if (payload.package_id_subs) {
            where.package_id = {
                notIn: payload.package_id_subs
            }
            delete req.query.package_id_subs
        }
        if (payload.date) {
            where.created_at = {
                lte: payload.date ? payload.date + 'T23:59:59+00:00' : undefined,
                gte: payload.date ? payload.date + 'T00:00:00+00:00' : undefined,
            }
        }
        if (isdeleted) where.is_deleted = false

        if (relations) {
            for (let [key, value] of Object.entries(relations)) {
                select[key] = value
            }
        }
        console.log(select)
        params = {
            where,
            select,
            take,
            skip,
            orderBy: {
                created_at: payload.sort ?? "asc"
            }
        }

        const data = await table.findMany(params);
        const total = await table.count({ where: where });

        const link = getLink(req);
        const queryParams = getSomeProperties(payload, Object.keys(payload));

        const resultData = paginateData(queryParams, data, payload.page, total, payload.per_page, link, skip);
        return response(Ok, "success", "success", resultData)
    } catch (error) {
        console.log(error)
        return response(InternalServerError, "failed", "somethink wronk")
    }
}

const showHelper = async (payload, table, relations) => {
    let tableName = table.name
    let data;
    let columns = await prisma.$queryRawUnsafe(`SHOW COLUMNS FROM ${tableName}`);
    let isdeleted = await prisma.$queryRawUnsafe(`SHOW COLUMNS FROM ${tableName} LIKE 'isdeleted'`);
    try {
        for (let key in columns) {
            let columName = columns[key].Field
            let changeName = false;
            if (columName.includes('_id')) {
                relations = { ...relations }
                changeName = columName.replace('_id', 's')
                relations[changeName] = true
            }
        }

        if (isdeleted) payload.is_deleted = false

        if (relations || relations != undefined) {
            console.log(relations)
            data = await findFirst(table, {
                where: payload,
                include: relations
            })
        }
        else {
            data = await findFirst(table, {
                where: payload
            })
        }
        console.log("show payload", data)
        if (!data) return response(badRequest, "failed", "data tidak ditemukan")
        return response(Ok, "success", "success", data)
    } catch (error) {
        console.log(error)
        return response(InternalServerError, "failed", "somethink wronk")
    }
}

const updateHelper = async (payload, table) => {
    try {
        let where = {
            id: payload.id,
        }
        let isdeleted = await prisma.$queryRawUnsafe(`SHOW COLUMNS FROM ${table.name} LIKE 'isdeleted'`);
        if (isdeleted) where.isdeleted = false

        let cek = await findFirst(table, {
            where: where
        })
        if (payload.updateData.password) {
            let newPass = await bcrtpt.hash(payload.updateData.password, 10).then(hash => {
                return hash
            })
            payload.updateData.password = newPass
        }
        payload.updateData.updated_at = await dateNow()

        if (!cek) return response(badRequest, "failed", "data tidak ditemukan");
        let data = await updateOne(table, payload)
        return response(Ok, "success", "Update berhasil", data)
    } catch (error) {
        console.log(error)
        return response(InternalServerError, "failed", "somethink wronk");
    }
}

const deleteHelper = async (id, table) => {
    let uuid = true
    let tableName = table.name
    let checkIdType = await prisma.$queryRawUnsafe(`SHOW COLUMNS FROM ${tableName} WHERE Field = 'id'`)
    let isdeleted = await prisma.$queryRawUnsafe(`SHOW COLUMNS FROM ${tableName} LIKE 'isdeleted'`);
    if (checkIdType[0].Type == 'int') uuid = false
    let check = await findFirst(table, {
        where: {
            id: uuid ? id : parseInt(id)
        }
    })
    if (!check) return response(badRequest, "failed", "data tidak ditemukan")
    try {
        let data;
        if (isdeleted) {
            let params = {
                id: uuid ? id : parseInt(id),
                updateData: {
                    is_deleted: true
                }
            }

            data = await updateOne(table, params);
        }
        else {
            data = await prisma.$queryRawUnsafe(`DELETE FROM ${tableName} WHERE id = ${uuid ? id : parseInt(id)}`);
        }
        return response(Ok, "success", "success delete data", data);
    } catch (error) {
        console.log(error)
        return response(InternalServerError, 'failed', 'some think wronk')
    }
}

const response = async (code, status, message, data) => {
    return {
        code,
        status,
        message,
        data
    }
}

export {
    createHelper,
    getHelper,
    showHelper,
    updateHelper,
    deleteHelper
}