import { getAccount, getProduct } from "@/utils/requests"
import useLanguage from "@/utils/useLanguage"
import { Layout, Product } from "@/components"

export default function Page({ account, language, product, sessionID }) {

    return (
       <Product account={account} language={language} product={product} sessionID={sessionID} />
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const {account, session} = await getAccount(context)
    const language = useLanguage(account.data, context)
    const product = await getProduct({ language: language.lang, id: id })
    return {
        props: {
            account: account,
            language: language,
            product: product,
            sessionID: session
        }
    }
}

Page.useProgress = true
Page.getLayout = (page) => {
    return <Layout account={page.props.account} language={page.props.language} head={{ title: page.props.product.data.title, content: page.props.product.data.description }} comp={{ header: true, footer: true }}>{page}</Layout>;
}