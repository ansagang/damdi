import { Sidebar } from "."

export default function AccountLayout({ children, account, language, sessionID }) {

    return (
        <div className="container" style={{display: 'flex'}}>
            <Sidebar account={account} language={language} sessionID={sessionID} />
            {children}
        </div>
    )
}