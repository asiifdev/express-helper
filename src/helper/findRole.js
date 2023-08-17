import { findFirst } from "../repository/baseRepository.js"
import { rolesTable } from "../utils/prismaSchema.js"

const findRoleByName = async (name) => {
    // Find Role
    return await findFirst(rolesTable, {
       where: {
           name
       }
   })
}

const findRoleById = async (id) => {
    // Find Role
    return await findFirst(rolesTable, {
       where: {
           id
       }
   })
}

export {
    findRoleByName,
    findRoleById
}