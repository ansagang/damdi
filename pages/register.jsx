import { Layout, RegisterForm } from "@/components"
import { getAccount } from "@/utils/requests"
import useLanguage from "@/utils/useLanguage"

export default function Register({language}) {

    return (
        <RegisterForm language={language} />
    )
}

export async function getServerSideProps(context) {
    const account = await getAccount(context)
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

Register.getLayout = (page) => {
    return <Layout head={{  title: page.props.language.register.title, content:  page.props.language.register.description }} comp={{ header: false, footer: false }}>{page}</Layout>;
};
Register.auth = false