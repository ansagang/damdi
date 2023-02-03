import { User, Session } from "@/models"

export default async function handleCheckAdmin (req, res) {
    const { sessionID } = req.body
    const session = await Session.findOne({ sessionID: sessionID })
    if (session) {
        const user = await User.findOne({ _id: session?.userID, role: 'admin' })
        if (user) {
            return true
        } else {
            res.send({
                success: false,
                message: 'User is not an admin'
            })
        }
    } else {
        res.send({
            success: false,
            message: 'Session not found'
        })
    }
}