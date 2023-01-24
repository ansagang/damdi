import '@/styles/style.scss'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }) {

    const getLayout = Component.getLayout || ((page) => page);

    return (
        <SessionProvider session={session}>
            {
                Component.auth ?
                    (
                        <Auth adminOnly={Component.auth.adminOnly}>
                            {getLayout(<Component {...pageProps} />)}
                        </Auth>
                    )
                    :
                    (
                        getLayout(<Component {...pageProps} />)
                    )
            }
        </SessionProvider>
    )
}

function Auth({ children, adminOnly }) {
    const router = useRouter();
    const { status, data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login');
        },
    });
    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (adminOnly && !session.user.isAdmin) {
        router.push('/login');
    }

    return children;
}