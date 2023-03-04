import { User, Session } from "@/models"
import languageDefinder from "./languageDefinder"

export default async function handleCheckAdmin (req, res) {
    const language = languageDefinder(req.query.lang)
    const { sessionID } = req.body
    const session = await Session.findOne({ sessionID: sessionID })
    if (session) {
        const user = await User.findOne({ _id: session?.userID, role: 'admin' })
        if (user) {
            return true
        } else {
            res.send({
                success: false,
                message: language.res.adminError
            })
        }
    } else {
        res.send({
            success: false,
            message: language.res.sessionNotFoundError
        })
    }
}