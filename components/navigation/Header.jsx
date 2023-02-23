import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

import { images } from "@/constants"
import { NavLink } from ".."

export default function Header({ account, language, cart }) {

    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState()

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
        <header>
            <div className="container__fluid">
                <div className="header__inner">
                    <div className="header__logo">
                        <div className="header__logo-title title">
                            <h2>damdi</h2>
                        </div>
                    </div>
                    <nav className="header__menu links">
                        <ul className="header__menu-list">
                            <li className="header__menu-list_item"><NavLink href={'/'}>{language.home.title}</NavLink></li>
                            <li className="header__menu-list_item"><NavLink href={'/about'}>{language.aboutUs.title}</NavLink></li>
                            <li className="header__menu-list_item"><NavLink href={'/products'}>{language.products.title}</NavLink></li>
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
                                            <Link href={"/account"}>
                                                <Image width={35} height={35} title={account.data.username} src={`/uploads/${account.data.img}`} alt="" />
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
                            {
                                account.data ?
                                    (
                                        <li className="header__menu-list_item">
                                            <Link href={"/cart"}>
                                                <Image width={35} height={35} src={images.cart} alt="cart" />
                                            </Link>
                                            <div className="header__menu-list_item-value">{cart}</div>
                                        </li>
                                    )
                                    :
                                    null
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}