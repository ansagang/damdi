import { NavLink } from ".."

export default function Header({ account, language }) {
    return (
        <header className="header">
            <div className="container__fluid">
                <div className="header__inner inner__mini">
                    <div className="header__logo">
                        <div className="header__logo-title title">
                            <h2>Damdi</h2>
                        </div>
                    </div>
                    <nav className="header__nav">
                        <ul className="header__nav-ul">
                            <li className="header__nav-li"><NavLink href={'/'}>{language.home.title}</NavLink></li>
                            <li className="header__nav-li"><NavLink href={'/about'}>{language.aboutUs.title}</NavLink></li>
                            <li className="header__nav-li"><NavLink href={'/catalog'}>{language.catalog.title}</NavLink></li>
                        </ul>
                    </nav>
                    <div className="header__nav">
                        <ul className="header__nav-ul">
                            <li className="header__nav-li"><NavLink href={'/account'}>{language.account.title}</NavLink></li>
                            <li className="header__nav-li"><NavLink href={'/cart'}>{language.cart.title}</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}