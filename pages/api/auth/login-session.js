import { Session, User } from "@/models"
import languageDefinder from "@/utils/languageDefinder"
import db from "@/utils/server"

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST': {
            return loginSession(req, res)
        }
    }
}

async function loginSession(req, res) {
    try {
        await db.connect()
        const language = languageDefinder(req.query.lang)
        const { sessionID } = req.body
        if (sessionID) {
            const session = await Session.findOne({ sessionID: sessionID })
            if (session) {
                const user = await User.findOne({ _id: session.userID })
                res.send({
                    success: true,
                    message: language.userResult,
                    data: user
                })
            } else {
                res.send({
                    success: false,
                    message: language.sessionNotFoundError
                })
            }
        } else {
            
            res.send({
                success: false,
                message: language.sessionRequiredError
            })
        }
    } catch (err) {
        res.send({
            success: false,
            message: err.toString()
        })
    }
}