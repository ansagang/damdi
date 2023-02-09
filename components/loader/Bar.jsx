export default function Bar({ animationDuration, progress }) {
    return (
        <div className="progress__bar" style={{ marginLeft: `${(-1 + progress) * 100}%`, transition: `margin-left ${animationDuration}ms linear` }}></div>
    )
}