import Image from "next/image"
import Link from "next/link";

export default function ClientOrderCard({ order, language }) {

    const time = new Date(order.createdAt).toLocaleTimeString();
    const date = new Date(order.createdAt).toLocaleDateString()

    return (
        <div className="order-card">
            <div className="order-card__top">
                <div className="order-card__title title">
                    <h2>{order.type}</h2>
                </div>
                <div className="order-card__info info">
                    <p>{date}, {time}</p>
                </div>
            </div>
            <hr />
            <div className="order-card__middle">
                <div className="order-card__list">
                    {
                        order.list.map((item) => (
                            <div className="order-card__item">
                                <Link scroll={true} href={{ pathname: `/products/${item.product.id}` }} className="order-card__item-img">
                                    <Image width={1} height={1} loading='lazy' unoptimized={true} src={`/uploads/${item.product.images[0]}`} />
                                </Link>
                                <div className="order-card__item-content">
                                    <div className="order-card__item-title title">
                                        <h3>{item.product.title} x{item.quantity}</h3>
                                    </div>
                                    <div className="order-card__item-category info">
                                        <p>{item.product.category.title}</p>
                                    </div>
                                    <div className="order-card__item-info info">
                                        <p>{item.product.description}</p>
                                    </div>
                                    <div className="order-card__item-price info">
                                        <p>{item.product.price.value}{item.product.price.currency}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <hr />
            <div className="order-card__bottom">
                <div className="order-card__price title">
                    <h3>{language.order.total}: {order.totalPrice.value}{order.totalPrice.currency}</h3>
                </div>
                <div className="order-card__status title">
                    <h3>{language.order.status.status}: {order.status}</h3>
                </div>
            </div>
        </div>
    )
}