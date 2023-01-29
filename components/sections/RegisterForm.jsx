import Image from "next/image"
import { images } from "@/constants"
import Link from "next/link"
import { useEffect, useState } from "react"
import Router from "next/router"
import useLanguage from "@/utils/useLanguage"
import axios from "axios"
import responseHandler from "@/utils/responseHandler"

export default function RegisterForm() {

    const dispatcher = responseHandler()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [lang, setLang] = useState('')
    useEffect(() => {
        const language = useLanguage()
        setLang(language.lang)
    }, [])

    async function register() {
        try {
            await axios.post(`/api/auth/register?lang=${lang}`, {
                email: email,
                password: password,
                username: username,
                confirmPassword: confirmPassword,
                lang: lang
            }).then((res) => {
                dispatcher({message: res.data.message, title: 'Alert', type: res.data.success})
                if (res.data.success) {
                    Router.push('/login')
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
                        <h2>Register</h2>
                    </div>
                    <div className="login__menu-info info">
                        <p>Register your accoount</p>
                    </div>
                    <form className="login__menu-form">
                        <div className="login__menu-form_input">
                            <input value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }} type="email" placeholder="Email" />
                        </div>
                        <div className="login__menu-form_input">
                            <input onChange={(e) => {
                                setUsername(e.target.value)
                            }} value={username} type="text" placeholder="Username" />
                        </div>
                        <div className="login__menu-form_input">
                            <input onChange={(e) => {
                                setPassword(e.target.value)
                            }} value={password} type="password" placeholder="Password" />
                        </div>
                        <div className="login__menu-form_input">
                            <input onChange={(e) => {
                                setConfirmPassword(e.target.value)
                            }} value={confirmPassword} type="password" placeholder="Confirm password" />
                        </div>

                        <button onClick={() => register()} type="button" className="login__menu-form_button primary">Register</button>
                        <p className="login__menu-form_note">Already have an account? <Link href={'/login'}>Sign in</Link></p>
                    </form>
                </div>
            </div>
        </section>
    )
}