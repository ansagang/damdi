import Image from "next/image"
import Link from "next/link"

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
                                                    products.data.map((product, i) => (
                                                        <>
                                                            <div className="catalog__list-item" key={i}>
                                                                <div className="catalog__list-item_img">
                                                                    <Image loading='lazy' height={1} width={1} unoptimized={true} title={product.title} src={`/uploads/${product.images[0]}`} alt="" />
                                                                </div>
                                                                <Link href={{ pathname: `/products/${product.id}` }} className="catalog__list-item_title title">
                                                                    <h3>{product.title}</h3>
                                                                </Link>
                                                            </div>
                                                        </>

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