import axios from "axios"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { images } from "@/constants"
import { NavLink } from ".."
import responseHandler from "@/utils/responseHandler"

export default function Header({ account, language, sessionID }) {

    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState()
    const [show, setShow] = useState(false)

    async function search() {
        router.query['search'] = router.query.search || ''
        if (searchTerm) {
            setSearchTerm('')
            delete router.query.flavors
            delete router.query.stock
            delete router.query.sortBy
            delete router.query.page
            delete router.query.price
            router.query.search = searchTerm
            router.pathname = '/products'
        }
        router.push({ pathname: router.pathname, query: router.query }, undefined, { scroll: false })
    }

    useEffect(() => {
        setShow(false)
    }, [router])

    const dispatcher = responseHandler()

    async function signOut() {
        try {
            await axios.post(`/api/auth/delete-session?lang=${language.lang}`, {
                sessionID: sessionID
            }).then((res) => {
                dispatcher({ message: res.data.message, title: language.res.message, type: res.data.success })
                if (res.data.success) {
                    router.push('/');
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <header className="header">
                <div className="container__fluid">
                    <div className="header__inner">
                        <nav className="header__left">
                            <ul className="header__links">
                                <li className="header__link title"><Link href={'/'}><h2>damdi</h2></Link></li>
                                <li className="header__link link"><NavLink href={'/'}>{language.home.title}</NavLink></li>
                                <li className="header__link link"><NavLink href={'/products'}>{language.products.title}</NavLink></li>
                                <li className="header__link link"><NavLink href={'/contacts'}>{language.contacts.title}</NavLink></li>
                            </ul>
                        </nav>
                        <nav className="header__right">
                            <ul className="header__buttons">
                                <li className="header__button input">
                                    <input value={searchTerm} placeholder={language.header.search} type="search" onKeyPress={(e) => e.key === 'Enter' ? search() : null} onChange={(e) => setSearchTerm(e.target.value)} />
                                </li>
                                {
                                    account.data ?
                                        (
                                            <li className="header__button cart">
                                                <Link href={"/cart"}>
                                                    <Image width={35} height={35} src={images.cart} alt="cart" />
                                                </Link>
                                            </li>
                                        )
                                        :
                                        null
                                }
                                {
                                    account.data ?
                                        (
                                            <li className="header__button account">
                                                <Link href={"/account"}>
                                                    <Image style={{ borderRadius: 50 }} width={35} height={35} title={account.data.username} src={images.account} alt="" />
                                                </Link>
                                            </li>
                                        )
                                        :
                                        <li className="header__button button">
                                            <Link href={"/login"}>
                                                <button type="button" className="primary">{language.login.buttons.login}</button>
                                            </Link>
                                        </li>
                                }
                                <li onClick={() => setShow(!show)} className="header__button menu">
                                    {images.menu}
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <div className={show ? "header__panel active" : "header__panel"}>
                <div className="header__panel-search">
                    <input value={searchTerm} placeholder={language.header.search} type="search" onKeyPress={(e) => e.key === 'Enter' ? search() : null} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="header__panel-links">
                    <li className="header__panel-link link"><NavLink href={'/'}>{language.home.title}</NavLink></li>
                    <li className="header__panel-link link"><NavLink href={'/products'}>{language.products.title}</NavLink></li>
                    <li className="header__panel-link link"><NavLink href={'/contacts'}>{language.contacts.title}</NavLink></li>

                    {
                        account.data ?
                            (
                                <li className="header__panel-link link"><NavLink href={'/cart'}>{language.cart.title}</NavLink></li>
                            )
                            :
                            <li className="header__panel-link link"><NavLink href={'/login'}>{language.login.title}</NavLink></li>
                    }
                    {
                        account.data ?
                            (
                                <li onClick={() => signOut()} className="header__panel-link link">{language.account.signOut}</li>
                            )
                            :
                            null
                    }
                </div>
            </div>
        </>
    )
}