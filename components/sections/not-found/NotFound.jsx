export default function NotFound({language, account}) {
    return (
        <section className="not-found">
            <div className="container">
                <div className="not-found__inner">
                    <div className="not-found__title title">
                        <h1>{language.notFound.title}</h1>
                    </div>
                </div>
            </div>
        </section>
    )
}