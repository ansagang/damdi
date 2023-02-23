export default function Cart({ language, cart, account }) {
    return (
        <section className="cart">
            <div className="container">
                <div className="cart__inner inner__big">
                    <div className="cart__title title">
                        <h1>{language.cart.title}</h1>
                    </div>
                    <div className="cart__list">
                        
                    </div>
                </div>
            </div>
        </section>
    )
}