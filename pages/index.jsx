import { Layout, Landing, Categories } from '@/components'
import { getAccount, getProducts, getCategories } from '@/utils/requests';
import useLanguage from '@/utils/useLanguage';

export default function Page({ account, language, products, categories}) {

    console.log(products, categories)


    return (
        <>
            <Landing language={language} />
            <Categories language={language} categories={categories} />
        </>

    )
}

export async function getServerSideProps(context) {

    const account = await getAccount(context)
    const language = useLanguage(account.data, context)
    const products = await getProducts({language: language.lang, limit: 3, price: '40-60', stock: 'false'})
    const categories = await getCategories({language: language.lang})
    return {
        props: {
            account: account,
            language: language,
            products: products,
            categories: categories
        }
    }
}

Page.getLayout = (page) => {
    return <Layout account={page.props.account} language={page.props.language} head={{ title: page.props.language.home.title, content: page.props.language.home.description }} comp={{ header: true, footer: true }}>{page}</Layout>;
};