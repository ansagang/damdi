import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function List({ products, language, category }) {

    const router = useRouter()
    const [lowestPrice, setLowestPrice] = useState()
    const [highestPrice, setHighestPrice] = useState()
    const [stock, setStock] = useState()
    const [flavors, setFlavors] = useState([])

    useEffect(() => {
        setLowestPrice(router.query.price ? router.query.price.split('-')[0] : products.facets.priceRange.lowest)
        setHighestPrice(router.query.price ? router.query.price.split('-')[1] : products.facets.priceRange.highest)
        setStock(router.query.stock ? router.query.stock : '')
        setFlavors(router.query.flavors ? router.query.flavors : '')
    }, [router])

    function filterFlavor(flavor) {
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
        router.push({ pathname: router.pathname, query: router.query }, undefined, { scroll: false })
    }

    function filterStock(stock) {
        router.query['stock'] = router.query.stock || ''
        if (stock) {
            router.query.stock = stock
        } else {
            delete router.query.stock
        }
        router.push({ pathname: router.pathname, query: router.query }, undefined, { scroll: false })
    }

    function filterSortBy(sortBy) {
        router.query['sortBy'] = router.query.sortBy || ''
        if (sortBy) {
            router.query.sortBy = sortBy
        } else {
            delete router.query.sortBy
        }
        router.push({ pathname: router.pathname, query: router.query }, undefined, { scroll: false })
    }

    function filterLimit(limit) {
        router.query['limit'] = router.query.limit || ''
        if (limit) {
            router.query.limit = limit
        } else {
            delete router.query.limit
        }
        router.push({ pathname: router.pathname, query: router.query }, undefined, { scroll: false })
    }

    function filterPage(page) {
        router.query['page'] = router.query.page || ''
        if (page) {
            router.query.page = page
        } else {
            delete router.query.page
        }
        router.push({ pathname: router.pathname, query: router.query }, undefined, { scroll: false })
    }

    function filterPrice() {
        router.query['price'] = router.query.price || ''
        if (lowestPrice && highestPrice) {
            router.query.price = `${lowestPrice}-${highestPrice}`
        } else {
            delete router.query.price
        }
        router.push({ pathname: router.pathname, query: router.query }, undefined, { scroll: false })
    }

    return (
        <>
            <section className="products">
                <div className="container">
                    <div className="products__inner inner">
                        <aside className="products__sidebar">
                            <div className="products__sidebar-title title">
                                <h1>{language.products.sideBar.title}</h1>
                            </div>
                            {
                                products.facets ?
                                    (
                                        <div className="products__sidebar-filters">
                                            <div className="products__sidebar-filter">
                                                <div className="products__sidebar-filter_title">
                                                    <h1>{language.products.sideBar.filters.price.price}</h1>
                                                </div>
                                                <div className="products__sidebar-filter_range">
                                                    <input onKeyPress={(e) => e.key === 'Enter' ? filterPrice() : null} onChange={(e) => setLowestPrice(e.target.value)} type='number' value={lowestPrice} />
                                                    <input onKeyPress={(e) => e.key === 'Enter' ? filterPrice() : null} onChange={(e) => setHighestPrice(e.target.value)} type="number" value={highestPrice} />
                                                </div>
                                            </div>
                                            {
                                                products.facets.flavors ?
                                                    (
                                                        <div className="products__sidebar-filter">
                                                            <div className="products__sidebar-filter_title">
                                                                <h1>{language.products.sideBar.filters.flavors}</h1>
                                                            </div>
                                                            <div className="products__sidebar-filter_list">
                                                                {
                                                                    products.facets.flavors.map((flavor, i) => (
                                                                        <div style={flavors.includes(flavor) ? {color: 'red'} : null} onClick={() => filterFlavor(flavor)} className="products__sidebar-filter_item" key={i}>
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
                                            <div className="products__sidebar-filter">
                                                <div className="products__sidebar-filter_title">
                                                    <h1>{language.products.sideBar.filters.stock}</h1>
                                                </div>
                                                <select value={stock} onChange={(e) => {
                                                    filterStock(e.target.value)
                                                }} className="products__sidebar-filter_list">
                                                    <option value=''>Выберите героя</option>
                                                    <option value="true">True</option>
                                                    <option value="false">False</option>
                                                </select>
                                            </div>
                                        </div>
                                    )
                                    :
                                    null
                            }
                        </aside>
                        <div className="products__catalog">
                            <div className="products__catalog-title title">
                                <h1>{router.query.search ? `${language.products.results.search}${router.query.search}` : category.data.title || language.products.title}</h1>
                            </div>
                            <div className="products__catalog-bar">
                                <div className="products__catalog-bar_results info">
                                    <p>{language.products.results.productsFound}{products.pagination.totalResults}</p>
                                </div>
                                <div className="products__catalog-bar_sort">
                                    <select onChange={(e) => filterSortBy(e.target.value)}>
                                        <option value="trendings">{language.products.sort.trendings}</option>
                                        <option value="new_arrivals">{language.products.sort.newArrivals}</option>
                                        <option value="price_asc">{language.products.sort.priceAsc}</option>
                                        <option value="price_desc">{language.products.sort.priceDesc}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="products__catalog-list list">
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
                </div>
            </section>
        </>
    )
}