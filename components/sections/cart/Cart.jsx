import { ProductCard } from "@/components";

export default function Cart({ language, cart, account, cartProducts }) {
    return (
        <section className="cart">
            <div className="container">
                <div className="cart__inner inner__big">
                    <div className="cart__title title">
                        <h1>{language.cart.title}</h1>
                    </div>
                    <div className="cart__list list">
                        {
                            cart.data.list.map((product) => (
                                <>
                                    {
                                        cartProducts.data.map((cartProduct) => {
                                            if (cartProduct.id === product.productId) {
                                                return <ProductCard product={cartProduct} />
                                            }
                                        })
                                    }
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}