import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"

export default function List({ products, language }) {

    const router = useRouter()

    function filter(flavor) {
        router.query['flavors'] = router.query.flavors || ''
        let flavors = router.query.flavors.split('-')
        if (flavors.includes(flavor)) {
            flavors = flavors.filter(i => i !== flavor)
        } else {
            flavors.push(flavor)
        }
        if (flavors.length > 0) {
            router.query.flavors = flavors.filter(el => el !== '').map(el => el).join("-")
        } else {
            delete router.query.flavors
        }
        router.push({pathname: router.pathname, query: router.query}, undefined, {scroll: false})
    }

    return (
        <>
            <section className="catalog">
                <div className="container">
                    <div className="catalog__inner inner">
                        <aside className="catalog__sidebar">
                            <div className="catalog__sidebar-title title">
                                <h1>{language.products.sideBar.title}</h1>
                            </div>
                            {
                                products.facets ?
                                    (
                                        <div className="catalog__sidebar-filters">
                                            {
                                                products.facets.flavors ?
                                                    (
                                                        <div className="catalog__sidebar-filter">
                                                            <div className="catalog__sidebar-filter_title">
                                                                <h1>{language.products.sideBar.filters.flavors}</h1>
                                                            </div>
                                                            <div className="catalog__sidebar-filter_list">
                                                                {
                                                                    products.facets.flavors.map((flavor, i) => (
                                                                        <div onClick={() => filter(flavor)} className="catalog__sidebar-filter_item" key={i}>
                                                                            <h1>{flavor}</h1>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                    :
                                                    null
                                            }
                                            {/* <div className="catalog__sidebar-filter">
                                                <div className="catalog__sidebar-filter_title">
                                                    <h1>{language.products.sideBar.filters.stock}</h1>
                                                </div>
                                                <div className="catalog__sidebar-filter_list">
                                                    <div className="catalog__sidebar-filter_item" key={i}>
                                                        <h1></h1>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>

                                    )
                                    :
                                    null
                            }
                        </aside>
                        <div className="catalog__list list">
                            {
                                products ?
                                    (
                                        products.data ?
                                            (
                                                products.data.length > 0 ?
                                                    (
                                                        products.data.map((product, i) => (
                                                            <div className="catalog__list-item" key={i}>
                                                                <div className="catalog__list-item_img">
                                                                    <Image loading='lazy' height={1} width={1} unoptimized={true} title={product.title} src={`/uploads/${product.images[0]}`} alt="" />
                                                                </div>
                                                                <Link href={{ pathname: `/products/${product.id}` }} className="catalog__list-item_title title">
                                                                    <h3>{product.title}</h3>
                                                                </Link>
                                                            </div>
                                                        ))

                                                    )
                                                    :
                                                    null
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
        </>
    )
}