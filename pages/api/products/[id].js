import { Product } from "@/models";
import languageDefinder from "@/utils/languageDefinder";
import db from "@/utils/server";

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': {
            return get(req, res)
        }
    }
}

async function get(req, res) {
    try {
        await db.connect()
        const language = languageDefinder(req.query.lang)
        const { id } = req.query
        const product = await Product.findOne({ id: id, language: language.lang })
        res.send({
            success: true,
            data: product,
            message: language.res.getResult
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.toString()
        })
    }
}