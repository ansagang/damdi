import Link from "next/link"
import Image from "next/image"

export default function CategoryCard({ category }) {
    return (
        <Link href={{ pathname: '/products', query: { category: category.code } }} className="category-card" scroll={true}>
            <div className="category-card__img">
                <Image loading='lazy' height={1} width={1} unoptimized={true} title={category.title} src={`/uploads/${category.image}`} alt="" />
            </div>
            <div className="category-card__content">
                <div className="category-card__title title">
                    <h3>{category.title}</h3>
                </div>
            </div>
        </Link>
    )
}