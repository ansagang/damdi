import { Office } from "@/models";
import languageDefinder from "@/utils/languageDefinder";
import db from "@/utils/server";
import { createOfficeValidation } from "@/utils/validations";
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
        const offices = await Office.find({ language: language.lang })
        res.send({
            success: true,
            data: offices,
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
            const errors = createOfficeValidation(req)
            if (errors.length === 0) {
                const { address, building, city, country, start, end, phone, id, title } = req.body
                new Office({
                    address: address,
                    building: building,
                    city: city,
                    country: country,
                    schedule: {
                        start: start,
                        end: end,
                    },
                    phone: phone,
                    id: id,
                    language: language.lang,
                    title: title
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