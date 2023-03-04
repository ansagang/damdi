import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

import { images } from "@/constants"
import { NavLink } from ".."

export default function Header({ account, language }) {

    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState()
    const [show, setShow] = useState(false)

    function search() {
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

    return (
        <header className="header">
            <div className="container__fluid">
                <div className="header__inner">
                    <div className="header__logo">
                        <div className="header__logo-title title">
                            <h2>damdi</h2>
                        </div>
                    </div>
                    <nav className="header__links links">
                        <ul className="header__links-list">
                            <li className="header__links-list_item link"><NavLink href={'/'}>{language.home.title}</NavLink></li>
                            <li className="header__links-list_item link"><NavLink href={'/products'}>{language.products.title}</NavLink></li>
                            <li className="header__links-list_item link"><NavLink href={'/contacts'}>{language.contacts.title}</NavLink></li>
                        </ul>
                    </nav>
                    <nav className="header__menu">
                        <ul className="header__menu-list">
                            <li className="header__menu-list_item">
                                <input value={searchTerm} placeholder={language.header.search} type="search" onKeyPress={(e) => e.key === 'Enter' ? search() : null} onChange={(e) => setSearchTerm(e.target.value)} />
                            </li>
                            {
                                account.data ?
                                    (
                                        <li className="header__menu-list_item">
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
                                        <li className="header__menu-list_item">
                                            <Link href={"/account"}>
                                                <Image style={{ borderRadius: 50 }} width={35} height={35} title={account.data.username} src={images.account} alt="" />
                                            </Link>
                                        </li>
                                    )
                                    :
                                    <li className="header__menu-list_item">
                                        <Link href={"/login"}>
                                            <button type="button" className="header__register-button primary">{language.login.buttons.login}</button>
                                        </Link>
                                    </li>
                            }
                            <li onClick={() => setShow(!show)} className="header__menu-list_item menu">
                                {images.menu}
                            </li>
                        </ul>
                    </nav>
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
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}