import Image from "next/image"

import { images } from "@/constants"
import { NavLink } from "@/components"

export default function Sidebar({ account, language, sessionID }) {

    return (
        <aside className="account-sidebar">
            <div className="account-sidebar__inner inner__aside">
                <div className="account-sidebar__profile">
                    <div className="account-sidebar__profile-img">
                        <Image loading='lazy' height={1} width={1} unoptimized={true} title={account.data.username} src={`/uploads/${account.data.img}`} alt={account.data.username} />
                    </div>
                    <div className="account-sidebar__profile-details">
                        <div className="account-sidebar__profile-detail title">
                            <h2>{account.data.username}</h2>
                        </div>
                        <div className="account-sidebar__profile-detail info">
                            <p>{account.data.email}</p>
                        </div>
                    </div>
                </div>
                <nav className="account-sidebar__menu">
                    <ul className="account-sidebar__menu-links">
                        <li className="account-sidebar__menu-link info">
                            <NavLink exact={true} href={'/account'}>
                                {images.information}
                                <h1>{language.account.details.title}</h1>
                            </NavLink>
                        </li>
                        <li className="account-sidebar__menu-link info">
                            <NavLink exact={true} href={'/account/orders'}>
                                {images.orders}
                                <h1>{language.account.orders.title}</h1>
                            </NavLink>
                        </li>
                        <li className="account-sidebar__menu-link info">
                            <NavLink exact={true} href={'/account/payment'}>
                                {images.payment}
                                <h1>{language.account.payment.title}</h1>
                            </NavLink>
                        </li>
                        {/* <li className="account-sidebar__menu-link info">
                            <NavLink exact={true} href={'/account'}>
                                {images.information}
                                <h1>{language.account.details.title}</h1>
                            </NavLink>
                        </li> */}
                    </ul>
                </nav>
            </div>
        </aside>
    )
}