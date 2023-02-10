import Link from "next/link"
import Image from "next/image"

export default function List({ products, language }) {
    return (
        <section className="catalog">
            <div className="container">
                <div className="catalog__inner inner">
                    <div className="catalog__list list">
                        {
                            products ?
                            (
                                products.data ?
                                    (
                                        products.data.length > 0 ?
                                            (
                                                products.data.map((product) => (
                                                    <div className="catalog__list-item">
                                                        <div className="catalog__list-item_img">
                                                            <Image height={1} width={1} unoptimized={true} title={product.title} src={`/uploads/${product.images[0]}`} alt="" />
                                                        </div>
                                                        <Link href={{ pathname: `/products/${product.id}`}} className="catalog__list-item_title title">
                                                            <h3>{product.title}</h3>
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