import { getAccount, getOrdersHistory } from '@/utils/requests';
import useLanguage from '@/utils/useLanguage';
import { Layout, AccountLayout, OrdersHistory } from '@/components';

export default function Page({ account, language, sessionID, ordersHistory }) {

    return (
        <OrdersHistory account={account} language={language} sessionID={sessionID} ordersHistory={ordersHistory} />
    )
}

export async function getServerSideProps(context) {

    const {account, session} = await getAccount(context)
    const language = useLanguage(account.data, context)
    const ordersHistory = await getOrdersHistory({language: language.lang, sessionID: session})

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
                sessionID: session,
                ordersHistory: ordersHistory
            }
        }
    }
}

Page.useProgress = true
Page.getLayout = (page) => {
    return <Layout account={page.props.account} language={page.props.language} sessionID={page.props.sessionID} head={{ title: page.props.language.account.ordersHistory.title, content: page.props.language.account.ordersHistory.description }} comp={{ header: true, footer: true }}><AccountLayout account={page.props.account} language={page.props.language} sessionID={page.props.sessionID   } >{page}</AccountLayout></Layout>;
};