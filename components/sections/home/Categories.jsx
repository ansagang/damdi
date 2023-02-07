export default function Categories({ language, categories }) {
    console.log(categories)
    return (
        <section className="categories">
            <div className="container">
                <div className="categories__inner inner">
                    <div className="categories__title title">
                        <h1>{language.home.categories.title}</h1>
                    </div>
                    {/* <div className="categories__info info">
                        <p></p>
                    </div> */}
                </div>
            </div>
        </section>
    )
}