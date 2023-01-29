import { Layout, Landing } from '@/components'
import Router from 'next/router';
import { signOut } from 'next-auth/react';
import axios from 'axios';
import useLanguage from '@/utils/useLanguage';
import account from '@/utils/account';

export default function Page({data}) {
    console.log(data);

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
    //     </>
    //     </>

    return (
        <>
        <Landing />

        <h2 onClick={() => signOut('')}>wfawf</h2>
        </>
        
    )
}

export async function getServerSideProps(context) {

    const data = await account(context)

    return {
        props: {
            data
        }
    }
}

Page.getLayout = (page) => {
    return <Layout data={page.props.data} head={{ title: 'Home', content: 'Content' }} comp={{ header: true, footer: true }}>{page}</Layout>;
};
Page.auth = false