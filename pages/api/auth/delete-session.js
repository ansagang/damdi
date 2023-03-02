import cookie from 'cookie'

import { Session } from "@/models"
import languageDefinder from "@/utils/languageDefinder"
import db from "@/utils/server"

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST': {
            return deleteSession(req, res)
        }
    }
}

async function deleteSession(req, res) {
    try {
        await db.connect()
        const language = languageDefinder(req.query.lang)
        const { sessionID } = req.body
        if (sessionID) {
            Session.findOneAndDelete({ sessionID: sessionID }, (err) => {
                if (!err) {
                    res.setHeader(
                        "Set-Cookie",
                        cookie.serialize("session", sessionID, {
                            maxAge: 0,
                            sameSite: "strict",
                            path: "/"
                        }) 
                    )
                    res.send({
                        success: true,
                        message: language.res.sessionDeleteResult
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
                message: language.res.sessionRequiredError
            })
        }
    } catch (err) {
        res.send({
            success: false,
            message: err.toString()
        })
    }
}