import { Layout } from '@/components'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Page() {

    const a = {username: 'ansagang', email: 'ansagaaang@gmail.com', password: 'aansag', confirmPassword: 'aansag', lang: 'en'}
    const email = 'ansagaaang@gmail.com'
    const password = "aansag"
    const {data: session} = useSession()
    const router = useRouter()
  
    console.log(session);

    async function signInC() {
        const status = await signIn('credentials', {
            email: email,
            password: password,
            callbackUrl: '/',
            redirect: false
        })
        console.log(status);
        if(status.ok) router.push(status.url)
    }
  
    return (
        <>
        <h3 onClick={() => signInC()}>login</h3>
        <h1 onClick={() => signIn('google')}>fawfa</h1>
        <h2 onClick={() => signOut('')}>wfawf</h2>
        </>
    )
  }

  Page.getLayout = (page) => {
    return <Layout head={{title: 'Home', content: 'Content'}} comp={{header: true, footer: true}}>{page}</Layout>;
  };

//   export async function getServerSideProps(context) {
//     console.log(context.req?.cookies || "");

//     const res = await fetch('http://localhost:3000/api/hello', {cache: 'default'})

//     const data = await res.json()
    
//     return {
//       props: {data}, // will be passed to the page component as props
//     }
//   }