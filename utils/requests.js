import axios from "axios"

export async function getAccount(context) {
    const session = context.req.cookies['session']
    const lang = context.req.headers["accept-language"].split(",")[0].split("-")[0]
    let account = {}
    try {
        await axios.post(`${process.env.URL}/api/auth/login-session?lang=${lang}`, {
            sessionID: session
        }).then((res) => {
            account = res.data
        })
    } catch (err) {
        console.log(err);
    }

    return account
}