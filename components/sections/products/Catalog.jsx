import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { Pagination, ProductCard } from "@/components"
import { images } from "@/constants"

export default function Catalog({ products, language, category }) {

    const router = useRouter()
    const [stock, setStock] = useState()
    const [flavors, setFlavors] = useState([])
    const [sortBy, setSortBy] = useState('trendings')
    const [lowestPrice, setLowestPrice] = useState(products.facets.priceRange.lowest)
    const [highestPrice, setHighestPrice] = useState(products.facets.priceRange.highest)
    const [sidebar, setSidebar] = useState(false)

    useEffect(() => {
        setLowestPrice(router.query.price ? router.query.price.split('-')[0] : products.facets.priceRange.lowest ? products.facets.priceRange.lowest : '')
        setHighestPrice(router.query.price ? router.query.price.split('-')[1] : products.facets.priceRange.highest ? products.facets.priceRange.highest : '')
        setFlavors(router.query.flavors ? router.query.flavors.split('-') : [])
        setStock(router.query.stock)
        setSortBy(router.query.sortBy ? router.query.sortBy : 'trendings')
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
            router.query.page = 1
        } else {
            delete router.query.flavors
        }
        router.push({ pathname: router.pathname, query: router.query }, undefined, { scroll: false })
    }

    function filterStock(stock) {
        router.query['stock'] = router.query.stock || ''
        if (stock) {
            router.query.stock = stock
            router.query.page = 1
        } else {
            delete router.query.stock
        }
        router.push({ pathname: router.pathname, query: router.query }, undefined, { scroll: false })
    }

    function filterSortBy(sortBy) {
        router.query['sortBy'] = router.query.sortBy || ''
        if (sortBy) {
            router.query.sortBy = sortBy
            router.query.page = 1
        } else {
            delete router.query.sortBy
        }
        router.push({ pathname: router.pathname, query: router.query }, undefined, { scroll: false })
    }

    function filterLimit(limit) {
        router.query['limit'] = router.query.limit || ''
        if (limit) {
            router.query.limit = limit
            router.query.page = 1
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
            router.query.page = 1
        } else {
            delete router.query.price
        }
        router.push({ pathname: router.pathname, query: router.query }, undefined, { scroll: false })
    }

    function clearFilters() {
        delete router.query.flavors
        delete router.query.stock
        delete router.query.sortBy
        delete router.query.page
        delete router.query.price
        router.push({ pathname: router.pathname, query: router.query }, undefined, { scroll: false })
    }

    return (
        <>
            <section className="products">
                <div className="container">
                    <div className="products__inner inner">
                        <aside className={sidebar ? "products__sidebar active" : "products__sidebar"}>
                            <div onClick={() => setSidebar(!sidebar)} className="products__sidebar-close">
                                {images.close}
                            </div>
                            <div className="products__sidebar-title title">
                                <h2>{language.products.sideBar.title}</h2>
                            </div>
                            {
                                products.facets ?
                                    (
                                        <div className="products__sidebar-filters">
                                            <div className="products__sidebar-filter">
                                                <div className="products__sidebar-filter_title title">
                                                    <h3>{language.products.sideBar.filters.price.price}</h3>
                                                </div>
                                                <div className="products__sidebar-filter_range">
                                                    <input onKeyPress={(e) => e.key === 'Enter' ? filterPrice() : null} min={products.facets.priceRange.lowest} onChange={(e) => setLowestPrice(e.target.value)} type='number' value={lowestPrice} />
                                                    <input onKeyPress={(e) => e.key === 'Enter' ? filterPrice() : null} max={products.facets.priceRange.highest} onChange={(e) => setHighestPrice(e.target.value)} type="number" value={highestPrice} />
                                                </div>
                                            </div>
                                            {
                                                products.facets.flavors ?
                                                    (
                                                        <div className="products__sidebar-filter">
                                                            <div className="products__sidebar-filter_title title">
                                                                <h3>{language.products.sideBar.filters.flavors}</h3>
                                                            </div>
                                                            <div className="products__sidebar-filter_list">
                                                                {
                                                                    products.facets.flavors.map((flavor, i) => (
                                                                        <div onClick={() => filterFlavor(flavor)} className={flavors.includes(flavor) ? 'products__sidebar-filter_item active info' : 'products__sidebar-filter_item info'} key={i}>
                                                                            <div className="checkbox"></div>
                                                                            <p>{flavor}</p>
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
                                                <div className="products__sidebar-filter_title title">
                                                    <h3>{language.products.sideBar.filters.stock}</h3>
                                                </div>
                                                <div className="products__sidebar-filter_list">
                                                    <div onClick={() => filterStock(stock === 'true' ? null : 'true')} className={stock === 'true' ? 'products__sidebar-filter_item active info' : 'products__sidebar-filter_item info'}>
                                                        <div className="checkbox"></div>
                                                        <p>True</p>
                                                    </div>
                                                    <div onClick={() => filterStock(stock === 'false' ? null : 'false')} className={stock === 'false' ? 'products__sidebar-filter_item active info' : 'products__sidebar-filter_item info'}>
                                                        <div className="checkbox"></div>
                                                        <p>False</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    :
                                    null
                            }
                                            <button type="submit" onClick={() => clearFilters()} className="products__sidebar-button primary">{language.products.sideBar.clearAll}</button>

                        </aside>
                        <div className="products__catalog">
                            <div className="products__catalog-title title">
                                <h1>{router.query.search ? `${language.products.results.search}${router.query.search}` : category.data.title || language.products.title}</h1>
                            </div>
                            <div className="products__catalog-bar">
                                <div className="products__catalog-bar_results info">
                                    <p>{language.products.results.productsFound}{products.pagination.totalResults}</p>
                                    <p>{language.products.results.pagesFound}{products.pagination.totalPages}</p>
                                </div>
                                <div className="products__catalog-bar_sort">
                                    <select value={sortBy} onChange={(e) => filterSortBy(e.target.value)}>
                                        <option value="trendings">{language.products.sort.trendings}</option>
                                        <option value="new_arrivals">{language.products.sort.newArrivals}</option>
                                        <option value="price_asc">{language.products.sort.priceAsc}</option>
                                        <option value="price_desc">{language.products.sort.priceDesc}</option>
                                    </select>
                                    <div onClick={() => setSidebar(!sidebar)} className="products__catalog-bar_sort-filter">
                                        {images.filter}
                                    </div>
                                </div>
                            </div>
                            <div className="products__catalog-list list__mini">
                                {
                                    products ?
                                        (
                                            products.data ?
                                                (
                                                    products.data.length > 0 ?
                                                        (
                                                            products.data.map((product, key) => (
                                                                <ProductCard product={product} key={key} />
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
                            <Pagination filterPage={filterPage} currentPage={products.pagination.currentPage} previousPage={products.pagination.previousPage} nextPage={products.pagination.nextPage} totalPages={products.pagination.totalPages} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}