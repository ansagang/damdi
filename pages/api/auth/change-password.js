import bcrypt from 'bcrypt'

import { Session, User } from "@/models"
import languageDefinder from "@/utils/languageDefinder"
import db from "@/utils/server"
import { changePasswordValidation } from '@/utils/validations'

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST': {
            return changePassword(req, res)
        }
    }
}

async function changePassword(req, res) {
    try {
        await db.connect()
        const language = languageDefinder(req.query.lang)
        const { sessionID, password, newPassword } = req.body
        const session = await Session.findOne({ sessionID: sessionID })
        if (sessionID) {
            if (session) {
                const errors = changePasswordValidation(req)
                if (errors.length === 0) {
                    const user = await User.findOne({ _id: session.userID })
                    if (user) {
                        if (await bcrypt.compare(password, user.password)) {
                            const salt = bcrypt.genSaltSync(10)
                            const hash = bcrypt.hashSync(newPassword, salt)
                            User.findOneAndUpdate({ _id: session.userID }, { password: hash }, (err) => {
                                if (!err) {
                                    res.send({
                                        success: true,
                                        message: language.res.passwordChangeResult
                                    })
                                } else {
                                    res.send({
                                        success: false,
                                        message: language.res.error
                                    })
                                }
                            }
                            )
                        } else {
                            res.send({
                                success: false,
                                message: language.res.passwordIncorrectError
                            })
                        }
                    } else {
                        res.send({
                            success: false,
                            message: language.res.userNotFoundError
                        })
                    }
                } else {
                    res.send({
                        success: false,
                        message: errors
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