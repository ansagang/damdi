import bcrypt from 'bcrypt'
import cryptoRandomString from 'crypto-random-string'

import { Session, User } from "@/models"
import languageDefinder from "@/utils/languageDefinder"
import db from "@/utils/server";
import { registerValidation } from "@/utils/validations"

const random = id => {
    return id + cryptoRandomString({ length: 20, type: 'alphanumeric' })
}

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST': {
            return register(req, res)
        }
    }
}

async function register(req, res) {
    try {
        await db.connect()
        const errors = registerValidation(req)
        if (errors.length === 0) {
            const language = languageDefinder(req.query.lang)
            const { username, password, lang, email } = req.body
            const _email = await User.findOne({ email: email })
            if (_email) {
                res.send({
                    success: false,
                    message: language.res.emailExistsError
                })
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
                const doc = new User({
                    username: username,
                    password: hash,
                    role: 'user',
                    lang: lang,
                    email: email,
                    shipping: {}
                })

                const user = await doc.save()

                const _sessionID = random(user._id)
                new Session({
                    sessionID: _sessionID,
                    userID: user._id,
                }).save()

                res.send({
                    success: true,
                    message: language.res.registrationResult,
                    sessionID: _sessionID
                })
            }
        } else {
            res.send({
                success: false,
                message: errors
            })
        }
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            message: err.toString()
        })
    }
}