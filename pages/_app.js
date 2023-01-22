import '@/styles/style.scss'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps: {session, ...pageProps} }) {

    const getLayout = Component.getLayout || ((page) => page);

    return (
        <SessionProvider session={session}>
            {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
    )
}