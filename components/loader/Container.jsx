export default function Container({ animationDuration, isFinished, children }) {
    return (
        <div className="progress" style={{ opacity: isFinished ? 0 : 1, transition: `opacity ${animationDuration}ms linear` }}>
            {children}
        </div>
    )
}