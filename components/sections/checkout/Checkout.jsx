import axios from "axios";

import { useState } from "react";
import { useRouter } from "next/router";

import responseHandler from "@/utils/responseHandler";
import { Information } from "@/components";

export default function Checkout({ language, account, sessionID, offices }) {

    const dispatcher = responseHandler()
    const router = useRouter();

    const [orderType, setOrderType] = useState('pickup')
    const [address, setAddress] = useState(account.data.shipping ? account.data.shipping.address : null)
    const [city, setCity] = useState(account.data.shipping ? account.data.shipping.city : null)
    const [zipCode, setZipcode] = useState()
    const [country, setCountry] = useState(account.data.shipping ? account.data.shipping.country : null)
    const [district, setDistrict] = useState(account.data.shipping ? account.data.shipping.district : null)
    const [phoneNumber, setPhoneNumber] = useState(account.data.phone)
    const [fullname, setFullname] = useState(account.data.fullname)
    const [officeId, setOfficeId] = useState()

    async function createOrder() {
        try {
            await axios.post(`/api/orders?lang=${language.lang}`, {
                sessionID: sessionID,
                type: orderType,
                phoneNumber: phoneNumber,
                address: address,
                city: city,
                zipCode: zipCode,
                country: country,
                district: district,
                fullname: fullname,
                officeId: officeId
            }).then((res) => {
                dispatcher({ message: res.data.message, title: language.res.message, type: false })
                if (res.data.success) {
                    router.push('/account/orders-history');
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    console.log(offices);

    return (
        <section className="checkout">
            <div className="container">
                <div className="checkout__inner inner__big">
                    <div className="checkout__tabs">
                        <div onClick={() => setOrderType('pickup')} className={orderType === 'pickup' ? "checkout__tab info active" : "checkout__tab info"}>
                            <h1>{language.order.type.pickup}</h1>
                        </div>
                        <div onClick={() => setOrderType('delivery')} className={orderType === 'delivery' ? "checkout__tab info active" : "checkout__tab info"}>
                            <h1>{language.order.type.delivery}</h1>
                        </div>
                    </div>
                    {
                        orderType === 'pickup' ?
                            (
                                <div className="checkout__pickup">
                                    <div className="checkout__pickup-list">
                                        {
                                            offices ?
                                                (
                                                    offices.data ?
                                                        (
                                                            offices.data.length > 0 ?
                                                                (
                                                                    offices.data.map((office) => (
                                                                        <>
                                                                            <div className="checkout__pickup-item">
                                                                                <input checked={officeId === office.id ? true : false} onChange={() => setOfficeId(office.id)} type="radio" className="checkout__pickup-item_input" />
                                                                                <div className="checkout__pickup-item_content">
                                                                                    <div className="checkout__pickup-item_title title">
                                                                                        <h3>{office.title}</h3>
                                                                                    </div>
                                                                                    <div className="checkout__pickup-item_info info">
                                                                                        <p>{office.address}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    ))
                                                                )
                                                                :
                                                                null
                                                        )
                                                        :
                                                        null
                                                )
                                                :
                                                null
                                        }
                                    </div>
                                    <Information>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga aperiam illum vero sequi distinctio, veniam impedit non, ipsam ea rerum tempore amet quae? Commodi minima rem hic mollitia, sed doloribus.</Information>
                                </div>
                            )
                            :
                            orderType === 'delivery' ?
                                (
                                    <div className="checkout__delivery">
                                        <div className="checkout__delivery-form">
                                            <div className="checkout__delivery-form_input">
                                                <input value={country} onChange={(e) => {
                                                    setCountry(e.target.value)
                                                }} type="text" placeholder={language.checkout.inputs.country} />
                                                <input value={city} onChange={(e) => {
                                                    setCity(e.target.value)
                                                }} type="text" placeholder={language.checkout.inputs.city} />
                                            </div>
                                            <div className="checkout__delivery-form_input">
                                                <input value={district} onChange={(e) => {
                                                    setDistrict(e.target.value)
                                                }} type="text" placeholder={language.checkout.inputs.district} />
                                                <input value={address} onChange={(e) => {
                                                    setAddress(e.target.value)
                                                }} type="text" placeholder={language.checkout.inputs.address} />
                                            </div>
                                            <div className="checkout__delivery-form_input">
                                                <input value={zipCode} onChange={(e) => {
                                                    setZipcode(e.target.value)
                                                }} type="text" placeholder={language.checkout.inputs.zipCode} />
                                            </div>
                                        </div>
                                        <Information>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga aperiam illum vero sequi distinctio, veniam impedit non, ipsam ea rerum tempore amet quae? Commodi minima rem hic mollitia, sed doloribus.</Information>
                                    </div>
                                )
                                :
                                null
                    }
                    <hr />
                    <div className="checkout__details">
                        <div className="checkout__details-title title">
                            <h2>{language.checkout.contactDetails}</h2>
                        </div>
                        <div className="checkout__details-form">
                            <div className="checkout__details-form_input">
                                <input value={fullname} onChange={(e) => {
                                    setFullname(e.target.value)
                                }} type="text" placeholder={language.checkout.inputs.fullname} />
                                <input value={phoneNumber} onChange={(e) => {
                                    setPhoneNumber(e.target.value)
                                }} type="text" placeholder={language.checkout.inputs.phoneNumber} />
                            </div>
                        </div>
                    </div>
                    <button onClick={() => createOrder()} className="checkout__button primary" type="button">{language.checkout.buttons.order}</button>
                </div>
            </div>
        </section>
    )
}