import { getAccount, getProduct } from "@/utils/requests"
import useLanguage from "@/utils/useLanguage"
import { Layout } from "@/components"

export default function Product({ account, language, product }) {
    console.log(product)

    return (
        <>
            <h1>{product.data.title}</h1>
        </>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const account = await getAccount(context)
    const language = useLanguage(account.data, context)
    const product = await getProduct({ language: language.lang, id: id})
    return {
        props: {
            account: account,
            language: language,
            product: product,
        }
    }
}

Product.useProgress = true
Product.getLayout = (page) => {
    return <Layout account={page.props.account} language={page.props.language} head={{ title: page.props.product.data.title, content: page.props.product.data.description }} comp={{ header: true, footer: true }}>{page}</Layout>;
}