import { getAccount, getCart, getCartProducts } from '@/utils/requests';
import useLanguage from '@/utils/useLanguage';
import { Layout, Cart } from '@/components';

export default function Page({ account, language, cart, cartProducts }) {

    // console.log(cart, account, language);
    console.log(cartProducts);

    return (
        <Cart cart={cart} account={account} language={language} cartProducts={cartProducts} />
    )
}

export async function getServerSideProps(context) {

    const {account, session} = await getAccount(context)
    const language = useLanguage(account.data, context)
    const cart = await getCart({ language: language.lang, sessionID: session })
    const productsId = []
    cart.data.list.forEach(product => productsId.push(product.productId))
    const cartProducts = await getCartProducts({ language: language.lang, sessionID: session, id: productsId.map(el => el).join("-") })

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
                cartProducts: cartProducts
            }
        }
    }
}

Page.useProgress = true
Page.getLayout = (page) => {
    return <Layout account={page.props.account} language={page.props.language} head={{ title: page.props.language.cart.title, content: page.props.language.cart.description }} comp={{ header: true, footer: true }}>{page}</Layout>;
};