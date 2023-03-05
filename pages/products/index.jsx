import { getAccount, getCategories, getProducts } from "@/utils/requests"
import useLanguage from "@/utils/useLanguage"
import { Layout } from "@/components"
import { Category, Catalog } from "@/components"

export default function Page({ account, language, products, categories, sessionID }) {

    return (
        <>
            {
                Array.isArray(categories.data) ?
                    null
                    :
                    <Category category={categories} language={language} />
            }
            <Catalog language={language} products={products} category={categories} />
        </>
    )
}

export async function getServerSideProps(context) {
    const { category, stock, limit, price, flavors, search, sortBy, page } = context.query;
    const {account, session} = await getAccount(context)
    const language = useLanguage(account.data, context)
    const products = await getProducts({ language: language.lang, category: category, stock: stock, limit: limit, price: price, flavors: flavors, search: search, sortBy: sortBy, page: page })
    const categories = await getCategories({ language: language.lang, code: category })
    return {
        props: {
            account: account,
            language: language,
            products: products,
            categories: categories,
            sessionID: session
        }
    }
}

Page.useProgress = true
Page.getLayout = (page) => {
    return <Layout account={page.props.account} language={page.props.language} sessionID={page.props.sessionID} head={{ title: page.props.language.products.title, content: page.props.language.products.description }} comp={{ header: true, footer: true }}>{page}</Layout>;
}