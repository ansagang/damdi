import axios from "axios"

import { useRouter } from "next/router"

import { NavLink } from "@/components"
import responseHandler from "@/utils/responseHandler"

export default function Sidebar({ account, language, sessionID, active }) {

    const dispatcher = responseHandler()
    const router = useRouter();

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
            <aside className="account-sidebar">
                <div className="account-sidebar__inner">
                    <nav className="account-sidebar__menu">
                        <ul className="account-sidebar__menu-links">
                            <NavLink className="account-sidebar__menu-link link" exact={true} href={'/account'}>{language.account.details.title}</NavLink>
                            <NavLink className="account-sidebar__menu-link link" exact={true} href={'/account/orders-history'}>{language.account.ordersHistory.title}</NavLink>
                            <li onClick={() => signOut()} className="account-sidebar__menu-link link">{language.account.signOut}</li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}