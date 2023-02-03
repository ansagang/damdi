export default async function facetsFinder(products) {
    const filters = {}

    const flavors = []
    const prices = []
    const priceRange = {}
    const stocks = []
    products.forEach(element => {
        element.flavors.forEach(element => {
            flavors.push(element)
        })
        stocks.push(element.stock)
        prices.push(element.price.value)

        const sorted = prices.slice().sort((a, b) => {
            return a - b
        })
        priceRange.smallest = sorted[0]
        priceRange.largest = sorted[sorted.length - 1]
    });
    const flavorsUnique = Array.from(new Set(flavors))
    const stocksUnique = Array.from(new Set(stocks))


    filters.flavors = flavorsUnique
    filters.stocks = stocksUnique
    filters.priceRange = priceRange

    return filters
}