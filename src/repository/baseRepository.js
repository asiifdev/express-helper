const insertOne = (table, params, relations) => {
    const data = table.create({
        data: params,
        include: relations
    });
    return data;
}

const insertMany = (table, params) => {
    const data = table.createMany({
        data: params
    });
    return data;
}

const findMany = async (table, params) => {
    let data;
    if ((params.select != undefined) && (params.where != undefined)) {
        data = table.findMany({
            where: params.where,
            select: params.select,
            take: params.take,
            skip: params.skip,
            orderBy: params.orderBy,
            include: params.include,
        })

        return data
    }

    if ((params.select != undefined) && (params.pagination != undefined)) {
        const page = Number(params.pagination.page) || 1
        const perPage = Number(params.pagination.take) || 10
        const skip = page > 0 ? perPage * (page - 1) : 0

        let countData = await table.count();
        data = await table.findMany({
            select: params.select,
            take: perPage,
            skip
        })

        const lastPage = Math.ceil(countData / perPage)
        return {
            data,
            meta: {
                countData,
                lastPage,
                currentPage: page,
                perPage,
                prev: page > 1 ? page - 1 : null,
                next: page < lastPage ? page + 1 : null,
            },
        }
    }

    if (params.select) {
        data = table.findMany({
            select: params.select
        });

        return data;
    }

    if (params.pagination) {
        const page = Number(params.pagination.page) || 1
        const perPage = Number(params.pagination.take) || 10
        const skip = page > 0 ? perPage * (page - 1) : 0

        let countData = await table.count();
        data = await table.findMany({
            take: perPage,
            skip
        })

        const lastPage = Math.ceil(countData / perPage)
        return {
            data,
            meta: {
                countData,
                lastPage,
                currentPage: page,
                perPage,
                prev: page > 1 ? page - 1 : null,
                next: page < lastPage ? page + 1 : null,
            },
        }
    }

    data = table.findMany();
    return data;
}

const findUnique = (table, params) => {
    let data;
    if (params.select) {
        data = table.findUnique({
            where: params.where,
            select: params.select
        });
        return data
    }
    data = table.findUnique({
        where: params
    });
    return data;
}

const findFirst = (table, params) => {
    let data;
    if (params.select) {
        data = table.findFirst({
            where: params.where,
            select: params.select
        });
        return data
    }
    data = table.findFirst(params)
    return data;
}

const updateOne = (table, params) => {
    const data = table.update({
        where: {
            id: params.id
        },
        data: params.updateData
    });

    return data;
}

const updateMany = (table, params) => {
    const data = table.updateMany({
        where: params.where,
        data: params.updateData
    })
    return data
}

const deleteOne = (table, params) => {
    const data = table.delete({
        where: params.id
    })
    return data
}

export {
    insertOne,
    insertMany,
    findMany,
    findUnique,
    findFirst,
    updateOne,
    updateMany,
    deleteOne
}