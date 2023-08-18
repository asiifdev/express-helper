import { findFirst } from "../repository/baseRepository.js"
import { RolesTable } from "../utils/prismaSchema.js"

const findRoleByName = async (name) => {
    // Find Role
    return await findFirst(RolesTable, {
       where: {
           name
       }
   })
}

const findRoleById = async (id) => {
    // Find Role
    return await findFirst(RolesTable, {
       where: {
           id
       }
   })
}

export {
    findRoleByName,
    findRoleById
}