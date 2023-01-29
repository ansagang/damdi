import axios from "axios"

export default async function account(context) {
    const session = context.req.cookies['session']
    const lang = context.req.headers["accept-language"].split(",")[0]
    let data = {}
    try {
        await axios.post(`http://localhost:3000/api/auth/login-session?lang=${lang}`, {
            sessionID: session
        }).then((res) => {
            data = res.data
        })
    } catch (err) {
        console.log(err);
    }

    return data
}