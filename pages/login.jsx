import { Layout, LoginForm } from "@/components"
import { getAccount } from "@/utils/requests"
import useLanguage from "@/utils/useLanguage"

export default function Page({ language, account }) {

    return (
        <LoginForm language={language} />
    )
}

export async function getServerSideProps(context) {
    const {account} = await getAccount(context)
    const language = useLanguage(account.data, context)
    if (account.data) {
        return {
            redirect: {
                destination: '/',
                permanent: true,
            },
        }
    } else {
        return {
            props: {
                account: account,
                language: language
            }
        }
    }
}

Page.useProgress = true
Page.getLayout = (page) => {
    return <Layout head={{ title: page.props.language.login.title, content: page.props.language.login.description }} comp={{ header: false, footer: false }}>{page}</Layout>;
}
