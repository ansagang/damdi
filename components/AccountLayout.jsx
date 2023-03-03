import { Sidebar } from "."

export default function AccountLayout({ children, account, language, sessionID }) {

    return (
        <section className="account">
            <div className="container">
                <div className="account__inner inner">
                    <Sidebar account={account} sessionID={sessionID} language={language} />
                    {children}
                </div>
            </div>
        </section>
    )
}