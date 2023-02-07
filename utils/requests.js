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

    return account
}

export async function getProducts({ language: language, limit: limit, price: price, stock: stock, category: category }) {
    let data = {}
    try {
        const query = `${limit ? `&limit=${limit}` : ''}` + `${price ? `&price=${price}` : ''}` + `${stock ? `&stock=${stock}` : ''}` + `${category ? `&category=${category}` : ''}`
        await axios.get(`${process.env.URL}/api/products?lang=${language}` + query)
            .then((res) => {
                data = res.data
            })
    } catch (err) {
        console.log(err);
    }

    return data
}

export async function getCategories({ language: language }) {
    let data = {}
    try {
        await axios.get(`${process.env.URL}/api/categories?lang=${language}`)
            .then((res) => {
                data = res.data
            })
    } catch (err) {
        console.log(err);
    }

    return data
}