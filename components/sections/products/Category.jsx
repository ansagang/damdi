import Image from "next/image"

export default function Category({ category }) {
    return (
        <section className="category">
            <div className="category__inner inner">
                <div className="category__left">
                    <div className="category__title title">
                        <h1>{category.data.title}</h1>
                    </div>
                    <div className="category__info info">
                        <p>{category.data.description}</p>
                    </div>
                </div>
                <div className="category__right">
                    <div className="category__img">
                        <Image height={1} width={1} unoptimized={true} title={category.data.title} src={`/uploads/${category.data.image}`} alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}