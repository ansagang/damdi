import axios from "axios"

import { useRouter } from "next/router"
import Link from "next/link"

import { NavLink } from "@/components"
import responseHandler from "@/utils/responseHandler"

export default function Sidebar({ account, language, sessionID }) {

    const dispatcher = responseHandler()
    const router = useRouter();

    async function signOut() {
        try {
            await axios.post(`/api/auth/delete-session?lang=${language.lang}`, {
                sessionID: sessionID
            }).then((res) => {
                dispatcher({ message: res.data.message, title: 'Alert', type: res.data.success })
                if (res.data.success) {
                    router.push('/');
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <aside className="account-sidebar">
            <div className="account-sidebar__inner inner">
                {/* <div className="account-sidebar__profile">
                    <div className="account-sidebar__profile-img">
                        <Image style={{borderRadius: 50}} loading='lazy' height={1} width={1} unoptimized={true} title={account.data.username} src={`/uploads/${account.data.img}`} alt={account.data.username} />
                    </div>
                    <div className="account-sidebar__profile-details">
                        <div className="account-sidebar__profile-detail title">
                            <h2>{account.data.username}</h2>
                        </div>
                        <div className="account-sidebar__profile-detail info">
                            <p>{account.data.email}</p>
                        </div>
                        <button onClick={() => signOut()} type="submit" className="account-sidebar__profile-detail text">Sign out</button>
                    </div>
                </div> */}
                <nav className="account-sidebar__menu">
                    <ul className="account-sidebar__menu-links">
                        <li className="account-sidebar__menu-link info">
                            <NavLink exact={true} href={'/account'}>
                                <h1>{language.account.details.title}</h1>
                            </NavLink>
                        </li>
                        <li className="account-sidebar__menu-link info">
                            <NavLink exact={true} href={'/account/orders'}>
                                <h1>{language.account.orders.title}</h1>
                            </NavLink>
                        </li>
                        <li onClick={() => signOut()} className="account-sidebar__menu-link info">
                            <Link href={''}>
                                <h1>{language.account.signOut}</h1>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}