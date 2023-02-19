import Image from "next/image"

import { getAccount, getProduct } from "@/utils/requests"
import useLanguage from "@/utils/useLanguage"
import { Layout } from "@/components"
import { useState } from "react"

export default function Page({ account, language, product }) {
    console.log(product)

    const [imageSelector, setImageSelector] = useState(product.data.images[0])

    return (
        <section className="product">
            <div className="container">
                <div className="product__inner inner__big">
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const account = await getAccount(context)
    const language = useLanguage(account.data, context)
    const product = await getProduct({ language: language.lang, id: id })
    return {
        props: {
            account: account,
            language: language,
            product: product,
        }
    }
}

Page.useProgress = true
Page.getLayout = (page) => {
    return <Layout account={page.props.account} language={page.props.language} head={{ title: page.props.product.data.title, content: page.props.product.data.description }} comp={{ header: true, footer: true }}>{page}</Layout>;
}