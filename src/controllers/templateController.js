import { findMany } from "../repository/baseRepository.js"
import { InternalServerError } from "../utils/httpStatus.js"
import { TemplatesTable } from "../utils/prismaSchema.js"
import { createHelper, deleteHelper, getHelper, showHelper, updateHelper } from "./helperController.js"

const createTemplates = async (req, res) => {
    let body = req.body
    try {
        let response = await createHelper(body, TemplatesTable)
        return res.status(response.code).json(response)
    } catch (error) {
        console.log(error)
        return res.status(InternalServerError).jsond(InternalServerError, InternalServerError, "failed", "somethink wronk");
    }
}

const getTemplates = async (req, res) => {
    let response = await getHelper(req.query, TemplatesTable, req)
    return res.status(response.code).json(response)
}

const showTemplates = async (req, res) => {
    let id = req.params.id
    let payload = {
        id: parseInt(id)
    }
    let response = await showHelper(payload, TemplatesTable)
    return res.status(response.code).json(response)
}

const updateTemplates = async (req, res) => {
    let id = req.params.id
    let body = req.body

    let tableName = TemplatesTable.name
    let columns = await prisma.$queryRawUnsafe(`SHOW COLUMNS FROM ${tableName}`);
    let updateData = {}

    for (let key in columns) {
        let columName = columns[key].Field
        updateData[columName] = body[columName]
    }

    let payload = {
        id: parseInt(id),
        updateData: updateData
    }

    let response = await updateHelper(payload, TemplatesTable)
    return res.status(response.code).json(response)
}

const deleteTemplates = async (req, res) => {
    let id = req.params.id
    let response = await deleteHelper(id, TemplatesTable)
    return res.status(response.code).json(response)
}

export {
    createTemplates,
    getTemplates,
    showTemplates,
    updateTemplates,
    deleteTemplates
}