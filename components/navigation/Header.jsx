import Image from "next/image"
import Link from "next/link"

import { images } from "@/constants"
import { NavLink } from ".."

export default function Header({ account, language }) {
    console.log(account.data)
    return (
        <header>
            <div className="container__fluid">
                <div className="header__inner inner__small">
                    <div className="header__logo">
                        <div className="header__logo-title title">
                            <h2>damdi</h2>
                        </div>
                    </div>
                    <nav className="header__menu">
                        <ul className="header__menu-list">
                            <li className="header__menu-list_item"><NavLink href={'/'}>{language.home.title}</NavLink></li>
                            <li className="header__menu-list_item"><NavLink href={'/about'}>{language.aboutUs.title}</NavLink></li>
                            <li className="header__menu-list_item"><NavLink href={'/products?limit=10&page=1&sortBy=trendings'}>{language.products.title}</NavLink></li>
                        </ul>
                    </nav>
                    <nav className="header__menu">
                        <ul className="header__menu-list">
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
                                    <div className="header__menu-list_item">
                                        <Link href={"/login"}>
                                            <button type="button" className="header__register-button primary">{language.login.buttons.login}</button>
                                        </Link>
                                    </div>
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}