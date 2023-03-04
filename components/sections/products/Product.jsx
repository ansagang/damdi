import axios from "axios"

import Image from "next/image"
import Link from "next/link"

import { useState } from "react"
import responseHandler from "@/utils/responseHandler"

export default function Product({ account, language, product, sessionID }) {

    const [imageSelector, setImageSelector] = useState(product.data.images[0])
    const [quantity, setQuantity] = useState(1)

    const dispatcher = responseHandler()


    async function addToCart() {
        try {
            await axios.post(`/api/cart?lang=${language.lang}&method=inc`, {
                sessionID: sessionID,
                quantity: quantity,
                productId: product.data.id
            }).then((res) => {
                dispatcher({ message: res.data.message, title: language.res.message, type: false })
                if (res.data.success) {
                    setQuantity(1)
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className="product">
            <div className="container">
                <div className="product__inner inner__big">
                    <div className="product__container">
                        <div className="product__left">
                            <div className="product__img">
                                <Image loading='lazy' height={1} width={1} unoptimized={true} title={product.data.title} src={`/uploads/${imageSelector}`} alt={product.data.title} />
                            </div>
                            {
                                product.data.images.length > 1 ?
                                    (
                                        <div className="product__img-selector">
                                            {
                                                product.data.images.map((image, key) => (
                                                    <div onClick={() => setImageSelector(image)} key={key} className={imageSelector === image ? "product__img-selector_item active" : "product__img-selector_item"}>
                                                        <Image loading='lazy' height={1} width={1} unoptimized={true} src={`/uploads/${image}`} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                    :
                                    null
                            }
                        </div>
                        <div className="product__right">
                            <div className="product__content">
                                <div className="product__category title">
                                    <h3>{product.data.category.title}</h3>
                                </div>
                                <div className="product__title title">
                                    <h1>{product.data.title}</h1>
                                </div>
                                <div className="product__info info">
                                    <p>{product.data.description}</p>
                                </div>
                                <div className="product__price info">
                                    <h1>{product.data.price.value} {product.data.price.currency}</h1>
                                </div>
                            </div>
                            <div className="product__cart">
                                <div className="product__cart-quantity">
                                    <button disabled={quantity <= 1 ? true : false} onClick={() => setQuantity(quantity - 1)} className="product__cart-quantity_button">-</button>
                                    <div className="product__cart-quantity_value">{quantity}</div>
                                    <button onClick={() => setQuantity(quantity + 1)} className="product__cart-quantity_button">+</button>
                                </div>
                                <button onClick={() => addToCart()} type="submit" className="product__cart-button primary">{language.product.addToCart}</button>
                                <Link className="product__cart-button" scroll={true} href={{ pathname: `/cart` }}><button type="submit" className="secondary">{language.product.goToCart}</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="product__details">
                        <div className="product__flavors detail">
                            <div className="product__flavors-title title">
                                <h2>{language.product.flavors}</h2>
                            </div>
                            <div className="product__flavors-list info">
                                <p>
                                    {
                                        product.data.flavors.map((flavor) => {
                                            if (product.data.flavors[product.data.flavors.length - 1] !== flavor) {
                                                return flavor + ', '
                                            } else {
                                                return flavor
                                            }
                                        })
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="product__ingredients detail">
                            <div className="product__ingredients-title title">
                                <h2>{language.product.ingredients}</h2>
                            </div>
                            <div className="product__ingredients-list info">
                                <p>
                                    {
                                        product.data.ingredients.map((ingredient) => {
                                            if (product.data.ingredients[product.data.ingredients.length - 1] !== ingredient) {
                                                return ingredient + ', '
                                            } else {
                                                return ingredient
                                            }
                                        })
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}