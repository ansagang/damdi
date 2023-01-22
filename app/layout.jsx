import '@/styles/style.scss'
export default function Layout({ children }) {
    return (
        <>
            <div className="wrapper">
                {children}
            </div>
        </>
    )
}