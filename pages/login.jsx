import Image from "next/image"
import images from "@/src/images"
import { Layout } from "@/components"
import { getSession } from "next-auth/react"

export default function Login() {

    return (
        <section className="login">
            <div className="container">
                <div className="login__inner">
                    <div className="login__banner">
                        <Image fill src={images.donuts[Math.floor(Math.random() * images.donuts.length)]} />
                    </div>
                    <div className="login__menu">
                        <div className="login__menu-title title">
                            <h2>Login</h2>
                        </div>
                        <div className="login__menu-info info">
                            <p>Login to your account</p>
                        </div>
                        <form className="login__menu-form">
                            <div className="login__menu-form_input">
                                <input type="email" placeholder="Email" />
                            </div>
                            <div className="login__menu-form_input">
                                <input type="password" placeholder="Password" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    console.log(session);
    // if (session) {
    //     return {
    //         redirect: {
    //             destination: '/',
    //             permanent: true,
    //         },
    //     }
    // } else {
    //     return {
    //         props: {
    //             session
    //         }
    //     }
    // }
    return {
        props: {
            session
        }
    }
}

Login.getLayout = (page) => {
    return <Layout head={{ title: 'Login', content: 'Login to your account' }} comp={{ header: false, footer: false }}>{page}</Layout>;
};
Login.auth = false
