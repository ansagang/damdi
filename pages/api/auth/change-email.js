import bcrypt from 'bcrypt'

import { Session, User } from "@/models"
import languageDefinder from "@/utils/languageDefinder"
import db from "@/utils/server"

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST': {
            return changeEmail(req, res)
        }
    }
}

async function changeEmail(req, res) {
    try {
        await db.connect()
        const language = languageDefinder(req.query.lang)
        const { sessionID, password, newEmail } = req.body
        if (sessionID && password && newEmail) {
            const session = await Session.findOne({ sessionID: sessionID })
            if (session) {
                const user = await User.findOne({ _id: session.userID })
                if (user) {
                    if (await bcrypt.compare(password, user.password)) {
                        const _email = await User.findOne({ email: newEmail })
                        if (_email) {
                            res.send({
                                success: false,
                                message: language.res.emailExistsError
                            })
                        } else {
                            User.findOneAndUpdate({ _id: session.userID }, { email: newEmail }, (err) => {
                                if (!err) {
                                    res.send({
                                        success: true,
                                        message: language.res.emailChangeResult
                                    })
                                } else {
                                    res.send({
                                        success: false,
                                        message: language.res.error
                                    })
                                }
                            })
                        }
                    } else {
                        res.send({
                            success: false,
                            message: language.res.passwordIncorrectError
                        })
                    }
                } else {
                    res.send({
                        success: false,
                        message: language.res.error
                    })
                }
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