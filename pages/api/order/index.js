import { Order, Session, Product, Cart } from "@/models";
import languageDefinder from "@/utils/languageDefinder";
import db from "@/utils/server";
import { createOrderValidation } from "@/utils/validations";

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
            const orders = await Order.find({ userId: session.userID })
            orders.forEach(order => {
                const list = order.list.filter(item => item.product.language == language.lang)
                const totalPrice = {}
                totalPrice.value = list.reduce((acc, curr) => {
                    return acc ? acc + curr.price.value : curr.price.value;
                }, 0)
                totalPrice.currency = list.reduce((acc, curr) => {
                    return curr.price.currency
                }, 0)
                order.list = list
                order.totalPrice = totalPrice
            })
            res.send({
                success: true,
                message: language.res.getResult,
                data: orders
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
        const { sessionID, type, address, city, zipCode, district, country, phoneNumber, fullname } = req.body
        if (sessionID && type && phoneNumber && fullname) {
            const session = await Session.findOne({ sessionID: sessionID })
            if (session) {
                if (type === 'pickup') {
                    const cart = await Cart.findOne({ userId: session.userID });
                    const list = cart.list

                    new Order({
                        userId: session.userID,
                        list: list,
                        status: language.order.status.pending,
                        type: language.order.type.pickup,
                        phoneNumber: phoneNumber,
                        fullname: fullname
                    }).save(err => {
                        if (!err) {
                            cart.list = []
                            cart.save();
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
                } else if (type === 'delivery') {
                    const errors = createOrderValidation(req)
                    if (errors.length === 0) {
                        const cart = await Cart.findOne({ userId: session.userID });
                        const list = cart.list

                        new Order({
                            userId: session.userID,
                            list: list,
                            status: language.order.status.pending,
                            type: language.order.type.delivery,
                            shipping: {
                                address: address,
                                city: city,
                                zipCode: zipCode,
                                district: district,
                                country: country
                            },
                            phoneNumber: phoneNumber,
                            fullname: fullname
                        }).save(err => {
                            if (!err) {
                                cart.list = []
                                cart.save();
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