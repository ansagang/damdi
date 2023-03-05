import { getAccount, getCart, getOffices } from '@/utils/requests';
import useLanguage from '@/utils/useLanguage';
import { Layout, Checkout } from '@/components';

export default function Page({ account, language, cart, sessionID, offices }) {
    
    return (
        <Checkout cart={cart} account={account} language={language} sessionID={sessionID} offices={offices} />
    )
}

export async function getServerSideProps(context) {

    const { account, session } = await getAccount(context)
    const language = useLanguage(account.data, context)
    const cart = await getCart({ language: language.lang, sessionID: session })
    const offices = await getOffices({ language: language.lang })

    if (!account.data || !cart.data || cart.data.list.length <= 0) {
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
                cart: cart,
                sessionID: session,
                offices: offices
            }
        }
    }
}

Page.useProgress = true
Page.getLayout = (page) => {
    return <Layout account={page.props.account} language={page.props.language} sessionID={page.props.sessionID} head={{ title: page.props.language.checkout.title, content: page.props.language.checkout.description }} comp={{ header: true, footer: true }}>{page}</Layout>;
};