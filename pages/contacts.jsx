import { Layout, Contacts } from '@/components'
import { getAccount, getOffices } from '@/utils/requests';
import useLanguage from '@/utils/useLanguage';

export default function Page({ account, language, offices, sessionID }) {

    return (
        <Contacts account={account} language={language} offices={offices} />
    )
}

export async function getServerSideProps(context) {

    const {account, session} = await getAccount(context)
    const language = useLanguage(account.data, context)
    const offices = await getOffices({language: language.lang})

    return {
        props: {
            account: account,
            language: language,
            offices: offices,
            sessionID: session
        }
    }
}

Page.useProgress = true
Page.getLayout = (page) => {
    return <Layout account={page.props.account} language={page.props.language} sessionID={page.props.sessionID} head={{ title: page.props.language.contacts.title, content: page.props.language.contacts.description }} comp={{ header: true}}>{page}</Layout>;
};