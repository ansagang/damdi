export default async function facetsFinder(products) {
    const filters = {}


    const prices = []
    const priceRange = {}
    const flavors = []
    products.forEach(element => {
        prices.push(element.price.value)

        element.flavors.forEach(element => {
            flavors.push(element)
        })

        const sorted = prices.slice().sort((a, b) => {
            return a - b
        })
        priceRange.lowest = sorted[0]
        priceRange.highest = sorted[sorted.length - 1]
    });
    const flavorsUnique = Array.from(new Set(flavors))

    filters.priceRange = priceRange
    filters.flavors = flavorsUnique

    return filters
}