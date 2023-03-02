import axios from "axios";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import responseHandler from "@/utils/responseHandler";
import { useState } from "react";

export default function Checkout({ language, cart, account, sessionID }) {

    const dispatcher = responseHandler()
    const router = useRouter();

    const [orderType, setOrderType] = useState('pickup')
    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [zipCode, setZipcode] = useState()
    const [country, setCountry] = useState('Kazakhstan')
    const [district, setDistrict] = useState()
    const [phoneNumber, setPhoneNumber] = useState(account.data.phone)
    const [fullname, setFullname] = useState(account.data.fullname)

    async function createOrder() {
        try {
            await axios.post(`/api/order?lang=${language.lang}`, {
                sessionID: sessionID,
                type: orderType,
                phoneNumber: phoneNumber,
                address: address,
                city: city,
                zipCode: zipCode,
                country: country,
                district: district,
                fullname: fullname
            }).then((res) => {
                dispatcher({ message: res.data.message, title: 'Alert', type: false })
                if (res.data.success) {
                    router.push('/account/orders');
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className="checkout">
            <div className="container">
                <div className="checkout__inner inner__big">
                    <div className="checkout__container">
                        <div className="checkout__menu">
                            <div className="checkout__menu-title title">
                                <h1>{language.checkout.title}</h1>
                            </div>
                            <div className="checkout__form">
                                <div className="checkout__form-input">
                                    <input value={fullname} onChange={(e) => {
                                        setFullname(e.target.value)
                                    }} type="text" placeholder={language.checkout.inputs.fullname} />
                                    <input value={phoneNumber} onChange={(e) => {
                                        setPhoneNumber(e.target.value)
                                    }} type="text" placeholder={language.checkout.inputs.phoneNumber} />
                                </div>
                                <div className="checkout__form-input">
                                    <select onChange={(e) => {
                                        setOrderType(e.target.value)
                                    }} value={orderType}>
                                        <option value='pickup'>{language.order.type.pickup}</option>
                                        <option value='delivery'>{language.order.type.delivery}</option>
                                    </select>
                                </div>
                            </div>
                            {
                                orderType === 'delivery' ?
                                    (
                                        <>
                                            <div className="checkout__form-input">
                                                <input value={country} onChange={(e) => {
                                                    setCountry(e.target.value)
                                                }} type="text" placeholder={language.checkout.inputs.country} />
                                                <input value={city} onChange={(e) => {
                                                    setCity(e.target.value)
                                                }} type="text" placeholder={language.checkout.inputs.city} />
                                            </div>
                                            <div className="checkout__form-input">
                                                <input value={district} onChange={(e) => {
                                                    setDistrict(e.target.value)
                                                }} type="text" placeholder={language.checkout.inputs.district} />
                                                <input value={address} onChange={(e) => {
                                                    setAddress(e.target.value)
                                                }} type="text" placeholder={language.checkout.inputs.address} />
                                            </div>
                                            <div className="checkout__form-input">
                                                <input value={zipCode} onChange={(e) => {
                                                    setZipcode(e.target.value)
                                                }} type="text" placeholder={language.checkout.inputs.zipCode} />
                                            </div>
                                        </>
                                    )
                                    :
                                    null
                            }
                            <button onClick={() => createOrder()} type="submit" className="checkout__form-button primary">{language.checkout.buttons.order}</button>
                        </div>
                        <div className="checkout__summary">
                            <div className="checkout__summary-title title">
                                <h1>{language.order.summary}</h1>
                            </div>
                            <div className="checkout__summary-list">
                                {
                                    cart ?
                                        (
                                            cart.data ?
                                                <>
                                                    {
                                                        cart.data.list.map((item, key) => (
                                                            <div key={key} className="checkout__summary-item">
                                                                <div className="checkout__summary-item_content">
                                                                    <div className="checkout__summary-item_title title">
                                                                        <h3>{item.product.title}</h3>
                                                                    </div>
                                                                    <div className="checkout__summary-item_info info">
                                                                        <p>{item.product.price.value}{item.product.price.currency}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="checkout__summary-item_quantity titl">
                                                                    <h3>{item.quantity}</h3>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                    <div className="checkout__summary-item">
                                                        <div className="checkout__summary-item_content">
                                                            <div className="checkout__summary-item_title title">
                                                                <h3>{language.order.total}</h3>
                                                            </div>
                                                        </div>
                                                        <div className="checkout__summary-item_quantity titl">
                                                            <h3>{cart.data.totalPrice.value}{cart.data.totalPrice.currency}</h3>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                null
                                        )
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}