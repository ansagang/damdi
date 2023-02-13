export default function Bar({ animationDuration, progress }) {
    return (
        <div className="progress__bar" style={{ width: `${progress * 100}%`, transition: `width ${animationDuration}ms linear` }}></div>
    )
}