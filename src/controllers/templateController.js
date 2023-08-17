import { findMany } from "../repository/baseRepository.js"
import { InternalServerError } from "../utils/httpStatus.js"
import { TemplatesTable } from "../utils/prismaSchema.js"
import { createHelper, deleteHelper, getHelper, showHelper, updateHelper } from "./helperController.js"

const createTemplates = async (req, res) => {
    let body = req.body
    let name = body.name
    let price = body.price
    let duration = body.duration
    let is_addon = body.is_addon
    let is_package = body.is_package
    try {
        let payload = {
            name,
            price,
            duration,
            is_addon,
            is_package
        }
        let response = await createHelper(payload, TemplatesTable)
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
    let name = body.name
    let price = body.price
    let duration = body.duration
    let is_addon = body.is_addon
    let is_package = body.is_package

    let payload = {
        id: parseInt(id),
        updateData: {
            name,
            price,
            duration,
            is_addon,
            is_package
        }
    }
    console.log(payload)
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