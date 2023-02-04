import Image from "next/image"
import { images } from "@/constants"
import Link from "next/link"
import { useState } from "react"
import Router from "next/router"
import axios from "axios"
import responseHandler from "@/utils/responseHandler"
import HiAtSymbol from 'react-icons/hi'

export default function LoginForm({language}) {

    
    const dispatcher = responseHandler()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function login() {
        try {
            await axios.post(`/api/auth/login?lang=${language.lang}`, {
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
                    <Image width="100%" height="100%" src={images.damdiBackground} />
                </div>
                <div className="login__menu">
                    <div className="login__menu-title title">
                        <h1>{language.login.title}</h1>
                    </div>
                    <div className="login__menu-info info">
                        <p>{language.login.description}</p>
                    </div>
                    <div onSubmit={() => login()} className="login__menu-form">
                        <div className="login__menu-form_input">
                            <input value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }} type="email" placeholder={language.login.inputs.email} />
                        </div>
                        <div className="login__menu-form_input">
                            <input onChange={(e) => {
                                setPassword(e.target.value)
                            }} value={password} type="password" placeholder={language.login.inputs.password}  />
                        </div>
                        <button onClick={() => login()} type='submit' className="login__menu-form_button primary">{language.login.buttons.login}</button>
                        <p className="login__menu-form_note info">{language.login.texts.dontHaveAnAccount}<Link href={'/register'}>{language.login.links.signUp}</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}