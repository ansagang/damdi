import { useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import axios from "axios"

import { images } from "@/constants"
import responseHandler from "@/utils/responseHandler"

export default function LoginForm({language}) {

    
    const dispatcher = responseHandler()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    async function login() {
        try {
            await axios.post(`/api/auth/login?lang=${language.lang}`, {
                email: email,
                password: password
            }).then((res) => {
                dispatcher({message: res.data.message, title: language.res.message, type: res.data.success})
                if (res.data.success) {
                    router.push('/')
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
                        <p className="login__menu-form_note info ">{language.login.texts.dontHaveAnAccount}<Link className="link" href={'/register'}>{language.login.links.signUp}</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}