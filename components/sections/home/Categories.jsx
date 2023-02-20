import { CategoryCard } from "@/components"

export default function Categories({ language, categories }) {
    return (
        <section className="categories">
            <div className="container">
                <div className="categories__inner inner">
                    <div className="categories__title title">
                        <h1>{language.home.categories.title}</h1>
                    </div>
                    <div className="categories__list list">
                        {
                            categories ?
                                (
                                    categories.data ?
                                        (
                                            categories.data.length > 0 ?
                                                (
                                                    categories.data.map((category, i) => (
                                                        <CategoryCard category={category} key={i} />
                                                    ))
                                                    
                                                )
                                                :
                                                null
                                        )
                                        :
                                        null
                                )
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}