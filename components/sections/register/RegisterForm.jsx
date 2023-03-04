import { useState } from "react"

import Image from "next/image"
import Link from "next/link"
import Router from "next/router"

import axios from "axios"

import { images } from "@/constants"
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
                dispatcher({message: res.data.message, title: language.res.message, type: res.data.success})
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
                    <Image unoptimized={true} width={1} height={1} src={images.damdiBackground} />
                </div>
                <div className="login__menu">
                    <div className="login__menu-title title">
                        <h1>{language.register.title}</h1>
                    </div>
                    <div className="login__menu-info info">
                        <p>{language.register.description}</p>
                    </div>
                    <div onSubmit={() => register()} className="login__menu-form">
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

                        <button onClick={() => register()} type="submit" className="login__menu-form_button primary">{language.register.buttons.register}</button>
                        <p className="login__menu-form_note info">{language.register.texts.alreadyHaveAnAccount}<Link className="link" href={'/login'}>{language.register.links.signIn}</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}