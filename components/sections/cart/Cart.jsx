import axios from "axios";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import responseHandler from "@/utils/responseHandler";

export default function Cart({ language, cart, account, sessionID }) {

    const dispatcher = responseHandler()
    const router = useRouter();

    async function updateQuantity(quantity, id) {
        try {
            await axios.post(`/api/cart?lang=${language.lang}`, {
                sessionID: sessionID,
                quantity: quantity,
                productId: id
            }).then((res) => {
                dispatcher({ message: res.data.message, title: 'Alert', type: res.data.success })
                if (res.data.success) {
                    router.push({pathname: router.pathname}, undefined, {scroll: false});
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className="cart">
            <div className="container">
                <div className="cart__inner inner__big">
                    <div className="cart__title title">
                        <h1>{language.cart.title}</h1>
                    </div>
                    <div className="cart__bar">
                        <div className="cart__bar-title info">
                            <p>{language.cart.bar.product}</p>
                        </div>
                        <div className="cart__bar-title info">
                            <p>{language.cart.bar.quantity}</p>
                        </div>
                        <div className="cart__bar-title info">
                            <p>{language.cart.bar.price}</p>
                        </div>
                        <div className="cart__bar-title info">
                            <p>{language.cart.bar.total}</p>
                        </div>
                    </div>
                    <div className="cart__list">
                        {
                            cart ?
                                (
                                    cart.data ?
                                        (
                                            cart.data.list.map((item, key) => (
                                                <div key={key} className="cart__product">
                                                    <Link scroll={true} href={{ pathname: `/products/${item.product.id}` }} className="cart__product-details">
                                                        <div className="cart__product-details_img">
                                                            <Image loading='lazy' height={1} width={1} unoptimized={true} title={item.product.title} src={`/uploads/${item.product.images[0]}`} alt={item.product.title} />
                                                        </div>
                                                        <div className="cart__product-details-content">
                                                            <div className="cart__product-details_title title">
                                                                <h3>{item.product.title}</h3>
                                                            </div>
                                                            <div className="cart__product-details_category info">
                                                                <p>{item.product.category.title}</p>
                                                            </div>
                                                            <button onClick={() => updateQuantity(0, item.product.id)} className="cart__product-details_button text">{language.cart.buttons.remove}</button>
                                                        </div>
                                                    </Link>
                                                    <div className="cart__product-quantity">
                                                        <button onClick={() => updateQuantity(item.quantity - 1, item.product.id)} className="cart__product-quantity_button text">-</button>
                                                        <div className="cart__product-quantity_value">{item.quantity}</div>
                                                        <button onClick={() => updateQuantity(item.quantity + 1, item.product.id)} className="cart__product-quantity_button text">+</button>
                                                    </div>
                                                    <div className="cart__product-price">
                                                        <div className="cart__product-price_title title">
                                                            <h3>{item.product.price.value}{item.product.price.currency}</h3>
                                                        </div>
                                                    </div>
                                                    <div className="cart__product-total">
                                                    <div className="cart__product-total_title title">
                                                            <h3>{item.price.value}{item.price.currency}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
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