import Link from "next/link";

import { images } from "@/constants";

export default function Contacts({ language, offices, account }) {

    return (
        <section className="contacts">
            <div className="container">
                <div className="contacts__inner inner__big">
                    <div className="contacts__title title">
                        <h1>{language.contacts.title}</h1>
                    </div>
                    <div className="contacts__list list">
                        {
                            offices ?
                                (
                                    offices.data ?
                                        (
                                            offices.data.length > 0 ?
                                                (
                                                    offices.data.map((office, i) => (
                                                        <>
                                                            <div className="contacts__item" key={i} >
                                                                {images.location}
                                                                <div className="contacts__item-upper">
                                                                    <div className="contacts__title title">
                                                                        <h2>{office.title}</h2>
                                                                    </div>
                                                                    <div className="contacts__info info">
                                                                        <p>{office.address}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="contacts__item-lower">
                                                                    <div className="contacts__schedule info">
                                                                        <p>{office.schedule.start} - {office.schedule.end}</p>
                                                                    </div>
                                                                    <div className="contacts__phone info">
                                                                        <Link href={`tel:${office.phone}`}>{office.phone}</Link>
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
                </div>
            </div>
        </section>
    )
}