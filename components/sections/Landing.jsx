export default function Landing({language}) {
    return (
        <section className="landing">
            <div className="container">
                <div className="landing__inner">
                    <div className="landing__title title">
                        <h1>{language.title}</h1>
                    </div>
                </div>
            </div>
        </section>
    )
}