import { Layout } from '@/components'
import useLanguage from '@/utils/useLanguage';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Page() {
    const { data: session, status } = useSession()
    const language = useLanguage(status, session.user)

    console.log(language, session);

    // async function signInC() {
    //     const status = await signIn('credentials', {
    //         email: 'ansagaaang@gmail.com',
    //         password: "aansag",
    //         callbackUrl: '/',
    //         redirect: false
    //     })
    //     console.log(status);
    //     if(status.ok) router.push(status.url)
    // }
    // <>
    //     <h3 onClick={() => signInC()}>login</h3>
    //     <h1 onClick={() => signIn('google')}>fawfa</h1>
    //     <h2 onClick={() => signOut('')}>wfawf</h2>
    //     </>

    return (
        <h1>faw</h1>
    )
}

Page.getLayout = (page) => {
    return <Layout head={{ title: 'Home', content: 'Content' }} comp={{ header: true, footer: true }}>{page}</Layout>;
};
Page.auth = false