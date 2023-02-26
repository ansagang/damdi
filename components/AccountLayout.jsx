import { Sidebar } from "."

export default function AccountLayout({ children, account, language, sessionID }) {

    return (
        <>
            <Sidebar account={account} language={language} sessionID={sessionID} />
            {children}
        </>
    )
}