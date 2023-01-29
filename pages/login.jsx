import { Layout, LoginForm } from "@/components"
import axios from "axios"

export default function Login() {

    return (
        <LoginForm />
    )
}

export async function getServerSideProps(context) {
    const session = context.req.cookies['session']
    const lang = context.req.headers["accept-language"].split(",")[0]
    let data = {}
    try {
        await axios.post(`http:/localhost:3000/api/auth/login-session?lang=${lang}`, {
            sessionID: session
        }).then((res) => {
            data = res.data
        })
    } catch (err) {
        console.log(err);
    }
    // if (session) {
    //     return {
    //         redirect: {
    //             destination: '/',
    //             permanent: true,
    //         },
    //     }
    // } else {
        return {
            props: {
                data
            }
        }
    // }
}

Login.getLayout = (page) => {
    return <Layout head={{ title: 'Login', content: 'Login to your account' }} comp={{ header: false, footer: false }}>{page}</Layout>;
};
Login.auth = false