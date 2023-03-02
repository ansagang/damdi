import Image from "next/image";

import { images } from "@/constants";

export default function Information({ children }) {
    return (
        <div className="information">
            <div className="information__img">
                {images.information}
            </div>
            <div className="information__info info">
                <p>{children}</p>
            </div>
        </div>
    )
}