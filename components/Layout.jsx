import Head from "next/head"

import Header from "./navigation/Header"

export default function Layout({ children, head: { title, content }, comp: { header }, account, language }) {

    return (
        <>
            <Head>
                <title>{title ? title + ' | Damdi' : 'Damdi'}</title>
                <meta name="description" content={content} />
            </Head>
            <div className="wrapper">
                {
                    header ?
                        (
                            <Header account={account} language={language} />
                        )
                        :
                        null
                }
                <main>
                    {children}
                </main>
            </div>
        </>
    )
}