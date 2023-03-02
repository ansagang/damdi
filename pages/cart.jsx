import { getAccount, getCart, getOffices } from '@/utils/requests';
import useLanguage from '@/utils/useLanguage';
import { Layout, Cart, Checkout } from '@/components';

export default function Page({ account, language, cart, sessionID }) {

    return (
        <Cart cart={cart} account={account} language={language} sessionID={sessionID} />
    )
}

export async function getServerSideProps(context) {

    const { account, session } = await getAccount(context)
    const language = useLanguage(account.data, context)
    const cart = await getCart({ language: language.lang, sessionID: session })

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
                cart: cart,
                sessionID: session
            }
        }
    }
}

Page.useProgress = true
Page.getLayout = (page) => {
    return <Layout account={page.props.account} language={page.props.language} head={{ title: page.props.language.cart.title, content: page.props.language.cart.description }} comp={{ header: true, footer: true }}>{page}</Layout>;
};