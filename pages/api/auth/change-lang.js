import { Session, User } from "@/models"
import languageDefinder from "@/utils/languageDefinder"
import db from "@/utils/server"

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST': {
            return changeLang(req, res)
        }
    }
}

async function changeLang(req, res) {
    try {
        await db.connect()
        const language = languageDefinder(req.query.lang)
        const { sessionID, lang } = req.body
        if (sessionID && lang) {
            const session = await Session.findOne({ sessionID: sessionID })
            if (session) {
                User.findOneAndUpdate({ _id: session.userID }, { lang: lang }, (err) => {
                    if (!err) {
                        res.send({
                            success: true,
                            message: language.res.languageChangeResult
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
                    message: language.res.sessionNotFoundError
                })
            }
        } else {
            res.send({
                success: false,
                message: language.res.missingFields
            })
        }
    } catch (err) {
        res.send({
            success: false,
            message: err.toString()
        })
    }
}