const parsePaginationToQueryParams = ({page, per_page}) => {
    const skip = page ? parseInt(page) - 1 : 0
    return {
        take: parseInt(per_page),
        skip:  skip * parseInt(per_page),
    }
}

export {
    parsePaginationToQueryParams
}