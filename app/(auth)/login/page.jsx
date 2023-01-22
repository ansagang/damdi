import Image from "next/image"
import images from "@/src/images"
import { ClickCounter } from "@/components/ClickCounter"

export default async function LoginPage() {

    return (
        <section className="login">
            <div className="container">
                <div className="login__inner">
                    <div className="login__banner">
                        <Image width={30} height={30} src={images.donuts[Math.floor(Math.random() * images.donuts.length)]} />
                    </div>
                    <div className="login__bar">
                        <div className="login__bar-title title">
                            <h3>Login</h3>
                        </div>
                    </div>
                    <ClickCounter />
                </div>
            </div>
        </section>
    )
}