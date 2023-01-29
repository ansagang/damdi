import Image from "next/image"
import { images } from "@/constants"
import Link from "next/link"
import { useState } from "react"
import Router from "next/router"
import axios from "axios"
import { useEffect } from "react"
import useLanguage from "@/utils/useLanguage"
import responseHandler from "@/utils/responseHandler"

export default function LoginForm() {

    
    const dispatcher = responseHandler()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [lang, setLang] = useState('')
    useEffect(() => {
        const language = useLanguage()
        setLang(language.lang)
    }, [])

    // async function signInCredentials() {
    //     const status = await signIn('credentials', {
    //         email: email,
    //         password: password,
    //         callbackUrl: '/',
    //         redirect: true
    //     })
    //     console.log(status);
    //     if(status.ok) Router.push(status.url)
    // }

    async function login() {
        try {
            await axios.post(`/api/auth/login?lang=${lang}`, {
                email: email,
                password: password
            }).then((res) => {
                dispatcher({message: res.data.message, title: 'Alert', type: res.data.success})
                if (res.data.success) {
                    Router.push('/')
                }
            })
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <section className="login">
            <div className="login__inner">
                <div className="login__banner">
                    <Image width="100%" height="100%" src={images.donutOne} />
                </div>
                <div className="login__menu">
                    <div className="login__menu-title title">
                        <h2>Login</h2>
                    </div>
                    <div className="login__menu-info info">
                        <p>Welcome back Please enter your details.</p>
                    </div>
                    <form className="login__menu-form">
                        <div className="login__menu-form_input">
                            <input value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }} type="email" placeholder="Email" />
                        </div>
                        <div className="login__menu-form_input">
                            <input onChange={(e) => {
                                setPassword(e.target.value)
                            }} value={password} type="password" placeholder="Password" />
                        </div>
                        <button onClick={() => login()} type="button" className="login__menu-form_button primary">Login</button>
                        <p className="login__menu-form_note">Don't have an account? <Link href={'/register'}>Sign up</Link></p>
                    </form>
                </div>
            </div>
        </section>
    )
}