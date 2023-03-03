import { Cart, Session, Product } from "@/models";
import languageDefinder from "@/utils/languageDefinder";
import db from "@/utils/server";

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
        const sessionID = req.query.sessionID
        const session = await Session.findOne({ sessionID: sessionID })
        if (session) {
            const cart = await Cart.findOne({ userId: session.userID })
            const list = cart.list.filter(item => item.product.language == language.lang)
            const totalPrice = {}
            totalPrice.value = list.reduce((acc, curr) => {
                return acc ? acc + curr.price.value : curr.price.value;
            }, 0)
            totalPrice.currency = list.reduce((acc, curr) => {
                return curr.price.currency
            }, 0)
            cart.list = list
            cart.totalPrice = totalPrice
            res.send({
                success: true,
                message: language.res.getResult,
                data: cart
            })
        } else {
            res.send({
                success: false,
                message: language.res.accountRequired
            })
        }
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
        const { sessionID, productId, quantity } = req.body
        const quantityType = req.query.method
        if (sessionID && productId) {
            const session = await Session.findOne({ sessionID: sessionID })
            if (session) {
                const cart = await Cart.findOne({ userId: session.userID });
                const products = await Product.find({ id: productId })
                if (cart) {
                    const indexes = []
                    for (let i = 0; i < cart.list.length; i++) {
                        if (cart.list[i].product.id === productId) {
                            indexes.push(i)
                        }
                    }
                    if (indexes.length !== 0) {
                        indexes.forEach((index) => {
                            console.log(index);
                            let product = cart.list[index];
                            if (quantityType === 'inc') {
                                product.quantity += parseInt(quantity);
                            } else {
                                product.quantity = parseInt(quantity);
                            }
                            product.price.value = product.product.price.value * product.quantity
                            cart.list[index] = product;
                        })
                        if (quantity === 0) {
                            for (const i of indexes.reverse()) {
                                cart.list.splice(i, 1);
                            }
                        }
                        await cart.save();
                        res.send({
                            success: true,
                            message: language.res.addResult
                        })
                    } else {
                        products.forEach((product) => {
                            cart.list.push({ product: product, quantity: quantity, price: { value: product.price.value * quantity, currency: product.price.currency } });
                        })
                        await cart.save();
                        await Product.findOneAndUpdate({ id: productId, language: 'en' }, { $inc: { trendScore: 1 }, })
                        await Product.findOneAndUpdate({ id: productId, language: 'ru' }, { $inc: { trendScore: 1 }, })
                        res.send({
                            success: true,
                            message: language.res.addResult
                        })
                    }
                } else {
                    const list = []

                    products.forEach((product) => {
                        list.push({ product: product, quantity: quantity, price: { value: product.price.value * quantity, currency: product.price.currency } })
                    })
                    new Cart({
                        userId: session.userID,
                        list: list
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
                    await Product.findOneAndUpdate({ id: productId, language: 'en' }, { $inc: { trendScore: 1 }, })
                    await Product.findOneAndUpdate({ id: productId, language: 'ru' }, { $inc: { trendScore: 1 }, })
                }
            } else {
                res.send({
                    success: false,
                    message: language.res.accountRequired
                })
            }
        } else {
            res.send({
                success: false,
                message: language.res.missingFields
            })
        }
    } catch (err) {
        res.send({
            success: false,
            message: err.toString()
        })
    }
}