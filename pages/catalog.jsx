import { useRouter } from "next/router"

import { getAccount, getCategories, getProducts } from "@/utils/requests"
import useLanguage from "@/utils/useLanguage"
import { Layout } from "@/components"

export default function Catalog({account, language, products, categories}) {
    console.log(categories, products)

    return (
        null
    )
}

export async function getServerSideProps(context) {
    const { category, stock, limit, price } = context.query;
    const account = await getAccount(context)
    const language = useLanguage(account.data, context)
    const products = await getProducts({language: language.lang, category: category, stock: stock, limit: limit, price: price})
    const categories = await getCategories({language: language.lang, code: category})
    return {
        props: {
            account: account,
            language: language,
            products: products,
            categories: categories
        }
    }
}

Catalog.getLayout = (page) => {
    return <Layout account={page.props.account} language={page.props.language} head={{ title: page.props.language.catalog.title, content: page.props.language.catalog.description }} comp={{ header: true, footer: true }}>{page}</Layout>;
}