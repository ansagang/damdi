import { Sidebar } from "."
import { images } from "@/constants"
import { useState } from "react"

export default function AccountLayout({ children, account, language, sessionID }) {

    const [active, setActive] = useState(false)

    return (
        <section className="account">
            <div className="container">
                <div className="account__inner inner">
                    <Sidebar active={active} account={account} sessionID={sessionID} language={language} />
                    {children}
                </div>
            </div>
        </section>
    )
}