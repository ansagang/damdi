import { ProductCard } from "@/components"

export default function List({ title, products }) {
    return (
        <section className="products-list">
            <div className="container">
                <div className="products-list__inner inner__small">
                    <div className="products-list__title title">
                        <h1>{title}</h1>
                    </div>
                    <div className="products-list__list list">
                        {
                            products ?
                                (
                                    products.data ?
                                        (
                                            products.data.length > 0 ?
                                                (
                                                    products.data.map((product, key) => (
                                                        <ProductCard product={product} key={key} />
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