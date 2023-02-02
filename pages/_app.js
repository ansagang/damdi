import '@/styles/style.scss'
import { useRouter } from 'next/router';
import NotificationProvider from '@/context/notification/NotificationProvider';

export default function App({ Component, pageProps: { session, ...pageProps } }) {

    const getLayout = Component.getLayout || ((page) => page);


    return (
        // <SessionProvider session={session}>
        // {
        // Component.auth ?
        //     (
        //         <NotificationProvider>
        //             <Auth adminOnly={Component.auth.adminOnly}>
        //                 {getLayout(<Component {...pageProps} />)}
        //             </Auth>
        //         </NotificationProvider>
        //     )
        //     :
        //     (
                <NotificationProvider>
                    {getLayout(<Component {...pageProps} />)}
                </NotificationProvider>
            // )
        // }
        // </SessionProvider>
    )
}

// function Auth({ children, adminOnly }) {
//     const router = useRouter();
//     const session = context.req.cookies['session']
//     const lang = context.req.headers["accept-language"].split(",")[0]
//     console.log(lang);
//     console.log(session);
//     let data = {}
//     try {
//         axios.post(`http://localhost:3000/api/auth/login-session?lang=${lang}`, {
//             sessionID: session
//         }).then((res) => {
//             console.log(res.data);
//             data = res.data
//         })
//     } catch (err) {
//         console.log(err);
//     }
//     if (adminOnly && !data.data.role !== 'admin') {
//         router.push('/login');
//     }

//     return children;
// }