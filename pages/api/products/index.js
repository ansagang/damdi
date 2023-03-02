import { Product } from "@/models";
import languageDefinder from "@/utils/languageDefinder";
import db from "@/utils/server";
import facetsFinder from "@/utils/facetsFinder";
import { createProductValidation } from "@/utils/validations";
import handleCheckAdmin from "@/utils/handleCheckAdmin";

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': {
            return get(req, res)
        }
        case 'POST': {
            return post(req, res)
        }
    }
}

async function get(req, res) {
    try {
        await db.connect()
        const language = languageDefinder(req.query.lang)
        const filterOne = {
            flavors: req.query.flavors ? { $elemMatch: { $in: req.query.flavors.split('-') } } : undefined,
            "price.value": req.query.price ? { $gte: parseInt(req.query.price.split('-')[0]), $lte: parseInt(req.query.price.split('-')[1]) } : undefined,
            stock: req.query.stock ? req.query.stock == 'true' ? true : false : undefined,
        }
        const filterTwo = {
            "category.code": req.query.category ? req.query.category : undefined,
            // $or: [{title: req.query.search ? { $regex: req.query.search, $options: 'i'} : undefined}, {"category.title": req.query.search ? { $regex: req.query.search, $options: 'i' } : undefined}, {flavors: req.query.search ? { $elemMatch: { $regex: req.query.search, $options: 'i' } } : undefined}],
            title: req.query.search ? { $regex: req.query.search, $options: 'i'} : undefined,
            language: language.lang
        }
        const sortBy = req.query.sortBy ? req.query.sortBy === 'trendings' ? { trendScore: -1 } : req.query.sortBy === 'new_arrivals' ? { createdAt: 1 } : req.query.sortBy.split('_')[0] === 'price' ? { "price.value": req.query.sortBy.split('_')[1] } : undefined : { trendScore: -1 }
        const page = req.query.page ? parseInt(req.query.page) : 1
        const limit = req.query.limit ? parseInt(req.query.limit) : 10
        const products = await Product.find(filterOne).find(filterTwo).sort(sortBy).skip((page - 1) * limit).limit(limit)
        const productsCategories = await Product.find(filterTwo).sort(sortBy)
        const totalResults = await Product.find(filterOne).find(filterTwo).sort(sortBy).count()
        const totalPages = Math.ceil(totalResults / limit)
        const previousPage = (page - 1) > 0 ? page - 1 : undefined
        const nextPage = (page + 1) <= totalPages ? page + 1 : undefined
        const currentPage = page <= totalPages ? page : undefined
        const facets = await facetsFinder(productsCategories)

        res.send({
            success: true,
            data: products,
            facets: facets,
            message: language.getResult,
            pagination: {
                totalResults: totalResults,
                totalPages: totalPages,
                previousPage: previousPage,
                currentPage: currentPage,
                nextPage: nextPage,
                limit: limit
            }
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.toString()
        })
    }
}

async function post(req, res) {
    try {
        await db.connect()
        const language = languageDefinder(req.query.lang)
        const admin = await handleCheckAdmin(req, res)
        if (admin) {
            const errors = createProductValidation(req)
            if (errors.length === 0) {
                const { title, description, price, category, images, stock, id, weight, quantity, flavors, ingredients } = req.body
                new Product({
                    title: title,
                    description: description,
                    price: price,
                    category: category,
                    images: images,
                    stock: stock,
                    id: id,
                    weight: weight,
                    quantity: quantity,
                    flavors: flavors,
                    ingredients: ingredients,
                    language: language.lang
                }).save(err => {
                    if (!err) {
                        res.send({
                            success: true,
                            message: language.res.addResult
                        })
                    } else {
                        res.send({
                            success: false,
                            message: language.res.error
                        })
                    }
                })
            } else {
                res.send({
                    success: false,
                    message: errors
                })
            }
        }
    } catch (err) {
        res.send({
            success: false,
            message: err.toString()
        })
    }
}