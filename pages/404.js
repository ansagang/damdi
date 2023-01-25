import { NotFound } from "@/components"
import { Layout } from "@/components";

export default function Error404() {

    return (
        <NotFound />
    )
}

Error404.getLayout = (page) => {
    return <Layout head={{ title: 'Not Found', content: '' }} comp={{ header: false, footer: false }}>{page}</Layout>;
};
Error404.auth = false