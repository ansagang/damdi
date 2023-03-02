import { Session, User } from "@/models"
import languageDefinder from "@/utils/languageDefinder"
import db from "@/utils/server"

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST': {
            return changeImg(req, res)
        }
    }
}

async function changeImg(req, res) {
    try {
        await db.connect()
        const language = languageDefinder(req.query.lang)
        const { sessionID, filename } = req.body
        if (sessionID) {
            const session = await Session.findOne({ sessionID: sessionID })
            if (session) {
                User.findOneAndUpdate({ _id: session.userID }, { img: filename }, (err) => {
                    if (!err) {
                        res.send({
                            success: true,
                            message: language.res.imageChangeResult
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