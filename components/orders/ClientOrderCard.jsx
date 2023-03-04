import Image from "next/image"
import Link from "next/link";

export default function ClientOrderCard({ order, language }) {

    function dateFormat(inputDate, format) {
        //parse the input date
        const date = new Date(inputDate);

        //extract the parts of the date
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        //replace the month
        format = format.replace("MM", month.toString().padStart(2, "0"));

        //replace the year
        if (format.indexOf("yyyy") > -1) {
            format = format.replace("yyyy", year.toString());
        } else if (format.indexOf("yy") > -1) {
            format = format.replace("yy", year.toString().substr(2, 2));
        }

        //replace the day
        format = format.replace("dd", day.toString().padStart(2, "0"));

        return format;
    }

    const date = dateFormat(order.createdAt.split('T')[0], 'dd-MM-yyyy')
    const time = order.createdAt.split('T')[1].split('.')[0].split(':')[0] + ':' + order.createdAt.split('T')[1].split('.')[0].split(':')[1]

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