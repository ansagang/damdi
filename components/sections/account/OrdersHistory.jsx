import { ClientOrderCard } from "@/components";

export default function OrdersHistory({ language, account, sessionID, ordersHistory }) {

    return (
        <div className="orders-history">
            <div className="orders-history__title title">
                <h1>{language.account.ordersHistory.title}</h1>
            </div>
            <div className="orders-history__list">
                {
                    ordersHistory ?
                        (
                            ordersHistory.data ?
                                (
                                    ordersHistory.data.length > 0 ?
                                        (
                                            ordersHistory.data.map((order) => (
                                                <ClientOrderCard language={language} order={order} />
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
    )
}