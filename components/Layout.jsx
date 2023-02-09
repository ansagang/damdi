import Head from "next/head"

import Header from "./navigation/Header"
import Footer from "./navigation/Footer"

export default function Layout({ children, head: { title, content }, comp: { header, footer }, account, language }) {

    return (
        <>
            <Head>
                <title>{title ? title + ' || Damdi' : 'Damdi'}</title>
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
                {
                    footer ?
                        (
                           <Footer />
                        )
                        :
                        null
                }
            </div>
        </>
    )
}