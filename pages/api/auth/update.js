import { Session, User } from "@/models"
import languageDefinder from "@/utils/languageDefinder"
import db from "@/utils/server"

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST': {
            return update(req, res)
        }
    }
}

async function update(req, res) {
    try {
        await db.connect()
        const language = languageDefinder(req.query.lang)
        const { sessionID, username, phone, lang, img, fullname, address, city, country, district } = req.body
        if (sessionID) {
            const session = await Session.findOne({ sessionID: sessionID })
            if (session) {
                User.findOneAndUpdate({ _id: session.userID }, {
                    username: username,
                    phone: phone,
                    lang: lang,
                    img: img,
                    fullname: fullname,
                    shipping: {
                        address: address,
                        city: city,
                        country: country,
                        district: district,
                    }
                }, (err) => {
                    if (!err) {
                        res.send({
                            success: true,
                            message: language.res.accountUpdateResult
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
                    message: language.res.accountRequired
                })
            }
        } else {
            res.send({
                success: false,
                message: language.res.accountRequired
            })
        }
    } catch (err) {
        res.send({
            success: false,
            message: err.toString()
        })
    }
}