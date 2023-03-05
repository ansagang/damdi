export default function Landing({ language }) {
    return (
        <section className="landing">
            <div className="container">
                <div className="landing__inner inner__big">
                    <div className="landing__left">
                        <div className="landing__title title">
                            <h1>{language.home.landing.title}</h1>
                        </div>
                        <div className="landing__info info">
                            <p>{language.home.landing.description}</p>
                        </div>
                    </div>
                    <div className="landing__right">
                        
                    </div>
                </div>
            </div>
        </section>
    )
}