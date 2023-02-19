import Link from "next/link"
import Image from "next/image"

export default function ProductCard({ product, key }) {
    return (
        <Link prefetch={true} scroll={true} href={{ pathname: `/products/${product.id}` }} className="product-card" key={key}>
            <div className="product-card__img">
                <Image loading='lazy' height={1} width={1} unoptimized={true} title={product.title} src={`/uploads/${product.images[0]}`} alt={product.title} />
            </div>
            <div className="product-card__content">
                <div className="product-card__title title">
                    <h3>{product.title}</h3>
                </div>
                <div className="product-card__info info">
                    <p>{product.description}</p>
                </div>
                <div className="product-card__price info">
                    <h1>{product.price.value} {product.price.currency}</h1>
                </div>
            </div>
        </Link>
    )
}