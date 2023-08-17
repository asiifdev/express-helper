const paginateData = (query, data, page = 1, total, per_page, link, skip) => {

    const dynamicLinks = {};
    page = parseInt(page);

    const lastPage = Math.ceil(total / per_page) || 1
    const from = data.length ? skip + 1 : 0;
    const to = (skip + data.length < skip + per_page) ? skip + data.length : skip + per_page;
    delete query.page
    const startLink = (page - 2) < 1 ? 1 : page - 2;
    const endLink = (page + 2) > lastPage ? lastPage : page + 2
    for (let i = startLink; i <= endLink; i++) {
        dynamicLinks[i] = linkWithQueryParams(link, { page: i, ...query })
        if (i === page) dynamicLinks[i] = true
    }

    return {
        query, data,
        meta: {
            page: {
                page: page,
                per_page: data.length,
                from, to, total,
                last_page: lastPage,
            },
        },
        links: {
            prev: page - 1 > 0 ? linkWithQueryParams(link, { page: page - 1, ...query }) : null,
            ...dynamicLinks,
            next: page + 1 < lastPage ? linkWithQueryParams(link, { page: page + 1, ...query }) : page + 1 === lastPage ? linkWithQueryParams(link, { page: lastPage, ...query }) : null,
            last: linkWithQueryParams(link, { page: lastPage, ...query }),
        }
    }
}

const linkWithQueryParams = (link, queryParams) => {
    let result = link;
    let count = 0;
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (count === 0) result += `?${key}=${value}`
            else result += `&${key}=${value}`
            count++;
        }
    }
    return result;
}

export {
    paginateData
}