import '@/styles/style.scss'
import NotificationProvider from '@/context/notification/NotificationProvider';

export default function App({ Component, pageProps: { session, ...pageProps } }) {

    const getLayout = Component.getLayout || ((page) => page);


    return (
        <NotificationProvider>
            {getLayout(<Component {...pageProps} />)}
        </NotificationProvider>
    )
}