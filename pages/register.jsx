import { Layout, RegisterForm } from "@/components"
import axios from "axios"

export default function Register() {

    return (
        <RegisterForm />
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

Register.getLayout = (page) => {
    return <Layout head={{ title: 'Register', content: 'Register your account' }} comp={{ header: false, footer: false }}>{page}</Layout>;
};
Register.auth = false