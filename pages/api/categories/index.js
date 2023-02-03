import { Category } from "@/models";
import languageDefinder from "@/utils/languageDefinder";
import db from "@/utils/server";
import { createCategoryValidation } from "@/utils/validations";
import handleCheckAdmin from "@/utils/handleCheckAdmin";

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': {
            return get(req, res)
        }
        case 'POST': {
            return post(req, res)
        }
    }
}

async function get(req, res) {
    try {
        await db.connect()
        const language = languageDefinder(req.query.lang)
        const categories = await Category.find({language: language.lang})
        res.send({
            success: true,
            data: categories,
            message: language.res.getResult,
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.toString()
        })
    }
}

async function post(req, res) {
    try {
        await db.connect()
        const language = languageDefinder(req.query.lang)
        const admin = await handleCheckAdmin(req, res)
        if (admin) {
            const errors = createCategoryValidation(req)
            if (errors.length === 0) {
                const { title, description, image, code } = req.body
                new Category({
                    title: title,
                    description: description,
                    image: image,
                    code: code,
                    language: language.lang
                }).save(err => {
                    if (!err) {
                        res.send({
                            success: true,
                            message: language.res.addResult
                        })
                    } else {
                        res.send({
                            success: false,
                            message: language.res.error
                        })
                    }
                })
            } else {
                res.send({
                    success: false,
                    message: errors
                })
            }
        }
    } catch (err) {
        res.send({
            success: false,
            message: err.toString()
        })
    }
}