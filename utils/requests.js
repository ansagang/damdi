import axios from "axios"

export async function getAccount(context) {
    const session = context.req.cookies['session']
    const lang = context.req.headers["accept-language"].split(",")[0].split("-")[0]
    let account = {}
    try {
        await axios.post(`${process.env.URL}/api/auth/login-session?lang=${lang}`, {
            sessionID: session
        }).then((res) => {
            account = res.data
        })
    } catch (err) {
        console.log(err);
    }

    return {account, session}
}

export async function getProducts({ language: language, limit: limit, price: price, stock: stock, category: category, flavors: flavors, search: search, sortBy: sortBy, page: page }) {
    let data = {}
    try {
        const query = `${limit ? `&limit=${limit}` : ''}` + `${price ? `&price=${price}` : ''}` + `${stock ? `&stock=${stock}` : ''}` + `${category ? `&category=${category}` : ''}` + `${flavors ? `&flavors=${flavors}` : ''}` + `${search ? `&search=${search}` : ''}` + `${sortBy ? `&sortBy=${sortBy}` : ''}` + `${page ? `&page=${page}` : ''}`
        await axios.get(`${process.env.URL}/api/products?lang=${language}` + query)
            .then((res) => {
                data = res.data
            })
    } catch (err) {
        console.log(err);
    }

    return data
}

export async function getCategories({ language: language, code }) {
    let data = {}
    try {
        const query = `${code ? `/${code}` : ''}`
        await axios.get(`${process.env.URL}/api/categories${query}?lang=${language}`)
            .then((res) => {
                data = res.data
            })
    } catch (err) {
        console.log(err);
    }

    return data
}

export async function getProduct({ language: language, id: id }) {
    let data = {}
    try {
        await axios.get(`${process.env.URL}/api/products/${id}?lang=${language}`)
            .then((res) => {
                data = res.data
            })
    } catch (err) {
        console.log(err);
    }

    return data
}

export async function getCart({ language: language, sessionID: sessionID }) {
    let data = {}
    try {
        await axios.get(`${process.env.URL}/api/cart?lang=${language}&sessionID=${sessionID}`)
            .then((res) => {
                data = res.data
            })
    } catch (err) {
        console.log(err);
    }

    return data
}

export async function getCartProducts({ language: language, sessionID: sessionID, id: id }) {
    let data = {}
    try {
        await axios.get(`${process.env.URL}/api/cart/products?lang=${language}&sessionID=${sessionID}&id=${id}`)
            .then((res) => {
                data = res.data
            })
    } catch (err) {
        console.log(err);
    }

    return data
}