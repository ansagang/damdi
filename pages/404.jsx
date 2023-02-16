import { useRouter } from "next/router";
import { useEffect } from "react";

// import { NotFound } from "@/components"
// import { Layout } from "@/components";
// import { getAccount } from "@/utils/requests";
// import useLanguage from "@/utils/useLanguage";

export default function Error404() {

    const router = useRouter()
    useEffect(() => {
        router.back()
    })

    return (
        null
    )
}

// export async function getStaticProps(context) {

//     const account = await getAccount(context)
//     const language = useLanguage(account.data, context)
//     return {
//         props: {
//             account: account,
//             language: language
//         }
//     }
// }

// Error404.useProgress = true
// Error404.getLayout = (page) => {
//     return <Layout account={page.props.account} language={page.props.language} head={{ title: page.props.language.notFound.title, content: page.props.language.notFound.description }} comp={{ header: false, footer: false }}>{page}</Layout>;
// };