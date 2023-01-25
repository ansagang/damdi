import Head from "next/head"
import Header from "./sections/Header"
import Footer from "./sections/Footer"

export default function Layout({ children, head: { title, content }, comp: { header, footer } }) {

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
                            <Header />
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