import { StatusCodes } from "http-status-codes";

const responseOK = (res, data, message) => {
    res.status(StatusCodes.OK).json({
        status : true,
        code : StatusCodes.OK,
        message: message || "Successful operation",
        response:data,
    })
}

const responseOKPaginate = (res, data, message) => {
    res.status(StatusCodes.OK).json({
        status : true,
        code : StatusCodes.OK,
        message: message || "Successful operation",
        response:{
            ...data
        },
    })
}

const responseCreated = (res, message, data) => {
    res.status(StatusCodes.CREATED).json({
        status : true,
        code : StatusCodes.CREATED,
        message: message || "Data created successfully",
        response:data,
    })
}

const responseUpdated = (res, data, message) => {
    res.status(StatusCodes.OK).json({
        status : true,
        code : StatusCodes.OK,
        message: message || "Data updated successfully",
        response:data,
    })
}

const responseDeleted = (res, message) => {
    res.status(StatusCodes.OK).json({
        status : true,
        code : StatusCodes.OK,
        message: message || "Data deleted successfully",
    })
}

const responseNotFound = (res, message) => {
    res.status(StatusCodes.NOT_FOUND).json({
        status : false,
        code : StatusCodes.NOT_FOUND,
        message: message || "Data Not Found",
    })
}

const responseBadRequest = (res, message) => {
    res.status(StatusCodes.BAD_REQUEST).json({
        status : false,
        code : StatusCodes.BAD_REQUEST,
        message: message || "Invalid required parameters",
    })
}

const responseInternalServerError = (res, message) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status : false,
        code : StatusCodes.INTERNAL_SERVER_ERROR,
        message: message || "Internal Server Error",
    })
}

const responseConflict = (res,message) => {
    res.status(StatusCodes.CONFLICT).json({
        status : false,
        code : StatusCodes.CONFLICT,
        message: message || "Internal Server Error",
    })
}

export {
    responseOK,
    responseNotFound,
    responseBadRequest,
    responseCreated,
    responseUpdated,
    responseDeleted,
    responseOKPaginate,
    responseInternalServerError,
    responseConflict
}