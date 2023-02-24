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
            res.send({
                success: true,
                message: language.res.getResult,
                data: cart
            })
        } else {
            res.send({
                success: false,
                message: language.res.sessionNotFoundError
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
        if (sessionID && productId) {
            const session = await Session.findOne({ sessionID: sessionID })
            if (session) {
                const cart = await Cart.findOne({ userId: session.userID });
                console.log(productId);
                if (cart) {
                    const itemIndex = cart.list.findIndex((item) => item.productId == productId);
                    //check if product exists or not
                    if (itemIndex > -1) {
                        let product = cart.list[itemIndex];
                        product.quantity += parseInt(quantity);
                        // cart.bill = cart.items.reduce((acc, curr) => {
                        //     return acc + curr.quantity * curr.price;
                        // }, 0)
                        cart.list[itemIndex] = product;
                        await cart.save();
                        // res.status(200).send(cart);
                        res.send({
                            success: true,
                            message: language.res.addResult
                        })
                    } else {
                        cart.list.push({ productId: productId, quantity: quantity });
                        // cart.bill = cart.items.reduce((acc, curr) => {
                        //     return acc + curr.quantity * curr.price;
                        // }, 0)
                        await cart.save();
                        res.send({
                            success: true,
                            message: language.res.addResult
                        })
                    }
                } else {
                    new Cart({
                        userId: session.userID,
                        list: [
                            {
                                productId: productId,
                                quantity: quantity
                            }
                        ]
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
                message: language.missingFields
            })
        }
    } catch (err) {
        res.send({
            success: false,
            message: err.toString()
        })
    }
}