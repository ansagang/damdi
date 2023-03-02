import axios from "axios";

import Image from "next/image";
import { useRouter } from "next/router";

import responseHandler from "@/utils/responseHandler";
import { useState } from "react";
import { Sidebar } from "@/components";

export default function Details({ language, account, sessionID }) {

    const dispatcher = responseHandler()
    const router = useRouter();

    const [username, setUsername] = useState(account.data.username)
    const [lang, setLang] = useState(account.data.lang)
    const [email, setEmail] = useState(account.data.email)
    const [fullname, setFullname] = useState(account.data.fullname)
    const [phone, setPhone] = useState(account.data.phone)
    const [address, setAddress] = useState(account.data.shipping ? account.data.shipping.address : null)
    const [city, setCity] = useState(account.data.shipping ? account.data.shipping.city : null)
    const [country, setCountry] = useState(account.data.shipping ? account.data.shipping.country : null)
    const [district, setDistrict] = useState(account.data.shipping ? account.data.shipping.district : null)

    async function update() {
        try {
            await axios.post(`/api/auth/update?lang=${language.lang}`, {
                sessionID: sessionID,
                username: username,
                lang: lang,
                email: email,
                fullname: fullname,
                phone: phone,
                address: address,
                city: city,
                country: country,
                district: district,
            }).then((res) => {
                dispatcher({ message: res.data.message, title: 'Alert', type: res.data.success })
                if (res.data.success) {
                    router.push({ pathname: router.pathname }, undefined, { scroll: false });
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className="account-details">
            <div className="container">
                {/* <Sidebar sessionID={sessionID} account={account} language={language} /> */}
                <div className="account-details__inner inner">
                    <div className="account-details__title title">
                        <h1>{language.account.details.title}</h1>
                    </div>
                    <div className="account-details__form">
                        <div className="account-details__form-input">
                            <input value={username} onChange={(e) => {
                                setUsername(e.target.value)
                            }} type="text" placeholder={language.account.details.inputs.username} />
                            <input value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }} type="text" placeholder={language.account.details.inputs.email} />
                        </div>
                        <div className="account-details__form-input">
                            <input value={fullname} onChange={(e) => {
                                setFullname(e.target.value)
                            }} type="text" placeholder={language.account.details.inputs.fullname} />
                            <input value={phone} onChange={(e) => {
                                setPhone(e.target.value)
                            }} type="text" placeholder={language.account.details.inputs.phone} />
                        </div>
                        <div className="account-details__form-input">
                            <select value={lang} onChange={(e) => {
                                setLang(e.target.value)
                            }} type="text" placeholder={language.account.details.inputs.lang}>
                                <option value="en">English</option>
                                <option value="ru">Русский</option>
                            </select>
                        </div>
                        <div className="account-details__form-input">
                            <input value={country} onChange={(e) => {
                                setCountry(e.target.value)
                            }} type="text" placeholder={language.account.details.inputs.country} />
                            <input value={city} onChange={(e) => {
                                setCity(e.target.value)
                            }} type="text" placeholder={language.account.details.inputs.city} />
                            <input value={district} onChange={(e) => {
                                setDistrict(e.target.value)
                            }} type="text" placeholder={language.account.details.inputs.district} />
                            <input value={address} onChange={(e) => {
                                setAddress(e.target.value)
                            }} type="text" placeholder={language.account.details.inputs.address} />
                        </div>
                        <button onClick={() => update()} disabled={username !== account.data.username || email !== account.data.email || fullname !== account.data.fullname || phone !== account.data.phone || lang !== account.data.lang || country !== account.data.shipping.country || city !== account.data.shipping.city || district !== account.data.shipping.district || address !== account.data.shipping.address ? false : true} className="account-details__form-button primary" type="button">{language.account.details.buttons.save}</button>
                    </div>
                </div>
            </div>
        </section>
    )
}