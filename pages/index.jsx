import { Layout, Landing } from '@/components'
import { useSession } from 'next-auth/react';
import useClient from '@/utils/useClient';
import { signIn } from 'next-auth/react';
import Router from 'next/router';

export default function Page() {
    const {session} = useClient()

    // async function signInC() {
    //     const status = await signIn('credentials', {
    //         email: 'ansagaaang@gmail.com',
    //         password: "aansag",
    //         callbackUrl: '/',
    //         redirect: false
    //     })
    //     console.log(status);
    //     if(status.ok) Router.push(status.url)
    // }
    // <h3 onClick={() => signInC()}>login</h3>
    //     <h1 onClick={() => signIn('google')}>fawfa</h1>
    //     <h2 onClick={() => signOut('')}>wfawf</h2>
    //     </>
    //     </>

    return (
        <Landing />
    )
}

Page.getLayout = (page) => {
    return <Layout head={{ title: 'Home', content: 'Content' }} comp={{ header: true, footer: true }}>{page}</Layout>;
};
Page.auth = false