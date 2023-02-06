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
        console.log(req.query);
        await db.connect()
        const language = languageDefinder(req.query.lang)
        const filterOne = {
            flavors: req.query.flavors ? { $elemMatch: { name: { $in: req.query.flavors.split('-') } } } : undefined,
            "price.value": req.query.price ? { $gte: parseInt(req.query.price.split('-')[0]), $lte: parseInt(req.query.price.split('-')[1]) } : undefined,
            stock: req.query.stock ? { stock: req.query.stock == 'true' ? true : false } : undefined,
        }
        const filterTwo = {
            "category.code": req.query.category ? req.query.category : undefined,
            title: req.query.search ? { $regex: req.query.search } : undefined,
            language: language.lang
        }
        const sortBy = req.query.sortBy ? { "price.value": req.query.sortBy } : undefined
        const page = req.query.page ? parseInt(req.query.page) : undefined
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined
        const products = await Product.find(filterOne).find(filterTwo).sort(sortBy).skip((page - 1) * limit).limit(limit)
        const productsCategories = await Product.find(filterTwo).sort(sortBy)
        const totalResults = await Product.find(filterOne).find(filterTwo).sort(sortBy).count()
        const totalPages = Math.ceil(totalResults / limit)
        const previousPage = (page - 1) > 0 ? page - 1 : undefined
        const nextPage = (page + 1) <= totalPages ? page + 1 : undefined
        const currentPage = page <= totalPages ? page : undefined

        res.send({
            success: true,
            data: products,
            facets: facetsFinder(productsCategories),
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