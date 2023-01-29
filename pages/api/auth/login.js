import { Session, User } from "@/models";
import languageDefinder from "@/utils/languageDefinder";
import db from "@/utils/server";
import { loginValidation } from "@/utils/validations";
import bcrypt from 'bcrypt'
import cryptoRandomString from "crypto-random-string";
import cookie from "cookie";

const random = id => {
    return id + cryptoRandomString({ length: 20, type: 'alphanumeric' })
}

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST': {
            return login(req, res)
        }
    }
}

async function login(req, res) {
    try {
        await db.connect()
        const language = languageDefinder(req.query.lang)
        const errors = loginValidation(req)
        if (errors.length === 0) {
            const { password, email } = req.body
            const user = await User.findOne({ email: email })
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    const sessionID = random(user._id)
                    new Session({
                        sessionID: sessionID,
                        userID: user._id,
                        createdAt: new Date()
                    }).save()
                    
                    res.setHeader(
                        "Set-Cookie",
                        cookie.serialize("session", sessionID, {
                            maxAge: 60 * 60 * 24,
                            sameSite: "strict",
                            path: "/"
                        }) 
                    )

                    res.send({
                        success: true,
                        message: language.res.loginResult,
                    })
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
    } catch (err) {
        res.send({
            success: false,
            message: err.toString()
        })
    }
}