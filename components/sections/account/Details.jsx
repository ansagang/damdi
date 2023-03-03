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
        <div className="details">
            <div className="details__title title">
                <h1>{language.account.details.title}</h1>
            </div>
            <div className="details__form">
                <div className="details__form-inputs">
                    <div className="details__form-input">
                        <div className="details__form-input_info info">
                            <p>{language.account.details.inputs.username}</p>
                        </div>
                        <input value={username} onChange={(e) => {
                            setUsername(e.target.value)
                        }} type="text" placeholder={language.account.details.inputs.username} />
                        {/* <input value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }} type="text" placeholder={language.account.details.inputs.email} /> */}
                    </div>
                    <div className="details__form-input">
                        <div className="details__form-input_info info">
                            <p>{language.account.details.inputs.email}</p>
                        </div>
                        <input value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} type="text" placeholder={language.account.details.inputs.email} />
                    </div>
                </div>
                <div className="details__form-inputs">
                    <div className="details__form-input">
                        <div className="details__form-input_info info">
                            <p>{language.account.details.inputs.fullname}</p>
                        </div>
                        <input value={fullname} onChange={(e) => {
                            setFullname(e.target.value)
                        }} type="text" placeholder={language.account.details.inputs.fullname} />
                        {/* <input value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }} type="text" placeholder={language.account.details.inputs.email} /> */}
                    </div>
                    <div className="details__form-input">
                        <div className="details__form-input_info info">
                            <p>{language.account.details.inputs.phone}</p>
                        </div>
                        <input value={phone} onChange={(e) => {
                            setPhone(e.target.value)
                        }} type="text" placeholder={language.account.details.inputs.phone} />
                    </div>
                </div>
                <div className="details__form-input">
                    <div className="details__form-input_info info">
                        <p>{language.account.details.inputs.lang}</p>
                    </div>
                    <select value={lang} onChange={(e) => {
                        setLang(e.target.value)
                    }} type="text" placeholder={language.account.details.inputs.lang}>
                        <option value="en">English</option>
                        <option value="ru">Русский</option>
                    </select>
                </div>
                <div className="details__form-inputs">
                    <div className="details__form-input">
                        <div className="details__form-input_info info">
                            <p>{language.account.details.inputs.country}</p>
                        </div>
                        <input value={country} onChange={(e) => {
                            setCountry(e.target.value)
                        }} type="text" placeholder={language.account.details.inputs.country} />
                    </div>
                    <div className="details__form-input">
                        <div className="details__form-input_info info">
                            <p>{language.account.details.inputs.city}</p>
                        </div>
                        <input value={city} onChange={(e) => {
                            setCity(e.target.value)
                        }} type="text" placeholder={language.account.details.inputs.city} />
                    </div>
                    <div className="details__form-input">
                        <div className="details__form-input_info info">
                            <p>{language.account.details.inputs.district}</p>
                        </div>
                        <input value={district} onChange={(e) => {
                            setDistrict(e.target.value)
                        }} type="text" placeholder={language.account.details.inputs.district} />
                    </div>
                    <div className="details__form-input">
                        <div className="details__form-input_info info">
                            <p>{language.account.details.inputs.address}</p>
                        </div>
                        <input value={address} onChange={(e) => {
                            setAddress(e.target.value)
                        }} type="text" placeholder={language.account.details.inputs.address} />
                    </div>
                </div>
                <div className="details__form-buttons">
                    <button onClick={() => {
                        setUsername(account.data.username)
                        setLang(account.data.lang)
                        setEmail(account.data.email)
                        setFullname(account.data.fullname)
                        setPhone(account.data.phone)
                        setAddress(account.data.shipping.address)
                        setCity(account.data.shipping.city)
                        setCountry(account.data.shipping.country)
                        setDistrict(account.data.shipping.district)
                        // const [address, setAddress] = useState(account.data.shipping ? account.data.shipping.address : null)
                        // const [city, setCity] = useState(account.data.shipping ? account.data.shipping.city : null)
                        // const [country, setCountry] = useState(account.data.shipping ? account.data.shipping.country : null)
                        // const [district, setDistrict] = useState(account.data.shipping ? account.data.shipping.district : null)
                    }} disabled={username !== account.data.username || email !== account.data.email || fullname !== account.data.fullname || phone !== account.data.phone || lang !== account.data.lang || country !== account.data.shipping.country || city !== account.data.shipping.city || district !== account.data.shipping.district || address !== account.data.shipping.address ? false : true} className="details__form-button secondary" type="button">{language.account.details.buttons.cancel}</button>
                    <button onClick={() => update()} disabled={username !== account.data.username || email !== account.data.email || fullname !== account.data.fullname || phone !== account.data.phone || lang !== account.data.lang || country !== account.data.shipping.country || city !== account.data.shipping.city || district !== account.data.shipping.district || address !== account.data.shipping.address ? false : true} className="details__form-button primary" type="button">{language.account.details.buttons.save}</button>
                </div>
            </div>
        </div>
    )
}