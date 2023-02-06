import { Layout, Landing } from '@/components'
import { getAccount, getProducts } from '@/utils/requests';
import useLanguage from '@/utils/useLanguage';

export default function Page({ account, language, products }) {


    return (
        <>
            <Landing language={language} />
        </>

    )
}

export async function getServerSideProps(context) {

    const account = await getAccount(context)
    const language = useLanguage(account.data, context)
    const products = await getProducts({language: language.lang, limit: 3, price: '40-60', stock: 'true'})
    return {
        props: {
            account: account,
            language: language,
            products: products
        }
    }
}

Page.getLayout = (page) => {
    return <Layout account={page.props.account} language={page.props.language} head={{ title: page.props.language.home.title, content: page.props.language.home.description }} comp={{ header: true, footer: true }}>{page}</Layout>;
};