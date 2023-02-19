import Image from "next/image"
import Link from "next/link"

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
                                                        <div className="categories__list-item" key={i}>
                                                            <div className="categories__list-item_img">
                                                                <Image loading='lazy' height={1} width={1} unoptimized={true} title={category.title} src={`/uploads/${category.image}`} alt="" />
                                                            </div>
                                                            <Link href={{ pathname: '/products', query: {category: category.code}}} className="categories__list-item_title title">
                                                                <h3>{category.title}</h3>
                                                            </Link>
                                                        </div>
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