import { useNProgress } from "@tanem/react-nprogress";

import Bar from "./Bar";
import Container from "./Container";

export default function Progress({ isAnimating }) {
    const {animationDuration, isFinished, progress} = useNProgress({
        isAnimating
    })

    return (
        <Container animationDuration={animationDuration} isFinished={isFinished} >
            <Bar animationDuration={animationDuration} progress={progress} />
        </Container>
    )
}