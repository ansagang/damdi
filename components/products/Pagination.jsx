import { images } from "@/constants"

export default function Pagination({ currentPage, nextPage, previousPage, totalPages, filterPage }) {

    return (
        totalPages !== 1 ?
            (
                <div className="products__catalog-pagination">
                    {
                        previousPage ?
                            (
                                <button disabled={previousPage ? false : true} onClick={() => filterPage(previousPage)} className="products__catalog-pagination_arrow left">
                                    {images.arrow}
                                </button>
                            )
                            :
                            null
                    }
                    {
                        Array.apply(null, Array(totalPages)).map((page, i) => (
                            <button disabled={currentPage === i + 1 ? true : false} onClick={() => filterPage(i + 1)} className={i + 1 === currentPage ? `products__catalog-pagination_page active` : `products__catalog-pagination_page`} key={i + 1}>
                                <p>{i + 1}</p>
                            </button>
                        ))
                    }
                    {
                        nextPage ?
                            (
                                <button disabled={nextPage ? false : true} onClick={() => filterPage(nextPage)} className="products__catalog-pagination_arrow right">
                                    {images.arrow}
                                </button>
                            )
                            :
                            null
                    }
                </div>
            )
            :
            null
    )
}