import Image from "next/image"
import { images } from "@/constants"
import Link from "next/link"
import { useState } from "react"
import Router from "next/router"
import axios from "axios"
import responseHandler from "@/utils/responseHandler"

export default function RegisterForm({language}) {

    const dispatcher = responseHandler()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    async function register() {
        try {
            await axios.post(`/api/auth/register?lang=${language.lang}`, {
                email: email,
                password: password,
                username: username,
                confirmPassword: confirmPassword,
                lang: language.lang
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
                        <h2>{language.register.title}</h2>
                    </div>
                    <div className="login__menu-info info">
                        <p>{language.register.description}</p>
                    </div>
                    <form className="login__menu-form">
                        <div className="login__menu-form_input">
                            <input value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }} type="email" placeholder={language.register.inputs.email} />
                        </div>
                        <div className="login__menu-form_input">
                            <input onChange={(e) => {
                                setUsername(e.target.value)
                            }} value={username} type="text" placeholder={language.register.inputs.username} />
                        </div>
                        <div className="login__menu-form_input">
                            <input onChange={(e) => {
                                setPassword(e.target.value)
                            }} value={password} type="password" placeholder={language.register.inputs.password} />
                        </div>
                        <div className="login__menu-form_input">
                            <input onChange={(e) => {
                                setConfirmPassword(e.target.value)
                            }} value={confirmPassword} type="password" placeholder={language.register.inputs.confirmPassword} />
                        </div>

                        <button onClick={() => register()} type="button" className="login__menu-form_button primary">{language.register.buttons.register}</button>
                        <p className="login__menu-form_note">{language.register.texts.alreadyHaveAnAccount}<Link href={'/login'}>{language.register.links.signIn}</Link></p>
                    </form>
                </div>
            </div>
        </section>
    )
}