export default async function facetsFinder(products) {
    const filters = {}


    const prices = []
    const priceRange = {}
    products.forEach(element => {
        prices.push(element.price.value)

        const sorted = prices.slice().sort((a, b) => {
            return a - b
        })
        priceRange.smallest = sorted[0]
        priceRange.largest = sorted[sorted.length - 1]
    });
    // const flavorsUnique = Array.from(new Set(flavors))
    // const stocksUnique = Array.from(new Set(stocks))

    filters.priceRange = priceRange

    return filters
}