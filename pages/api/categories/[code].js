import { Category } from "@/models";
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
        const { code } = req.query
        const category = await Category.findOne({ code: code, language: language.lang })
        res.send({
            success: true,
            data: category,
            message: language.res.getResult
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.toString()
        })
    }
}