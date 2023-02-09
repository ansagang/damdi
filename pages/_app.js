import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import '@/styles/style.scss'
import NotificationProvider from '@/context/notification/NotificationProvider';
import { Progress } from '@/components';

export default function App({ Component, pageProps: { session, ...pageProps } }) {

    const getLayout = Component.getLayout || ((page) => page);
    const useProgress = Component.useProgress || false
    const [isAnimating, setIsAnimating] = useState(false)

    const router = useRouter()
    useEffect(() => {
        const handleStart = () => {
            setIsAnimating(true)
        }
        const handleStop = () => {
            setIsAnimating(false)
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleStop)
            router.events.off('routeChangeError', handleStop)
        }
    }, [router])

    return (
        <NotificationProvider>
            {
                useProgress ?
                    <Progress isAnimating={isAnimating} />
                    :
                    null
            }
            {getLayout(<Component {...pageProps} />)}
        </NotificationProvider>
    )
}