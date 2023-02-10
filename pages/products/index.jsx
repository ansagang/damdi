import { getAccount, getCategories, getProducts } from "@/utils/requests"
import useLanguage from "@/utils/useLanguage"
import { Layout } from "@/components"
import { Category, List } from "@/components"

export default function Products({ account, language, products, categories }) {
    console.log(categories, products)

    return (
        <>
            {
                Array.isArray(categories.data) ?
                    null
                    :
                    <Category category={categories} language={language} />
            }
            <List language={language} products={products} />
        </>
    )
}

export async function getServerSideProps(context) {
    const { category, stock, limit, price } = context.query;
    const account = await getAccount(context)
    const language = useLanguage(account.data, context)
    const products = await getProducts({ language: language.lang, category: category, stock: stock, limit: limit, price: price })
    const categories = await getCategories({ language: language.lang, code: category })
    return {
        props: {
            account: account,
            language: language,
            products: products,
            categories: categories
        }
    }
}

Products.useProgress = true
Products.getLayout = (page) => {
    return <Layout account={page.props.account} language={page.props.language} head={{ title: page.props.language.products.title, content: page.props.language.products.description }} comp={{ header: true, footer: true }}>{page}</Layout>;
}