import { Layout, Landing, Categories, List } from '@/components'
import { getAccount, getProducts, getCategories, getCart } from '@/utils/requests';
import useLanguage from '@/utils/useLanguage';

export default function Page({ account, language, categories, newArrivals, trendings }) {

    console.log(account);

    return (
        <>
            <Landing language={language} />
            <Categories language={language} categories={categories} />
            <List title={language.home.trendingsList.title} products={trendings} />
            <List title={language.home.newArrivalsList.title} products={newArrivals} />
        </>

    )
}

export async function getServerSideProps(context) {

    const {account} = await getAccount(context)
    const language = useLanguage(account.data, context)
    const categories = await getCategories({language: language.lang})
    const trendings = await getProducts({language: language.lang, limit: 4, sortBy: 'trendings'})
    const newArrivals = await getProducts({language: language.lang, limit: 4, sortBy: 'new_arrivals'})

    return {
        props: {
            account: account,
            language: language,
            categories: categories,
            trendings: trendings,
            newArrivals: newArrivals
        }
    }
}

Page.useProgress = true
Page.getLayout = (page) => {
    return <Layout account={page.props.account} language={page.props.language} head={{ title: page.props.language.home.title, content: page.props.language.home.description }} comp={{ header: true, footer: true }}>{page}</Layout>;
};