import { getAccount } from '@/utils/requests';
import useLanguage from '@/utils/useLanguage';
import { Layout, AccountLayout, Details } from '@/components';

export default function Page({ account, language, sessionID }) {

    return (
        <Details account={account} language={language} sessionID={sessionID} />
    )
}

export async function getServerSideProps(context) {

    const {account, session} = await getAccount(context)
    const language = useLanguage(account.data, context)

    if (!account.data) {
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
                language: language,
                sessionID: session
            }
        }
    }
}

Page.useProgress = true
Page.getLayout = (page) => {
    return <Layout account={page.props.account} language={page.props.language} sessionID={page.props.sessionID} head={{ title: page.props.language.account.details.title, content: page.props.language.account.details.description }} comp={{ header: true, footer: true }}><AccountLayout account={page.props.account} language={page.props.language} sessionID={page.props.sessionID}>{page}</AccountLayout></Layout>;
};