import { useSession } from "next-auth/react"
import useLanguage from "./useLanguage"
import { useEffect, useState } from "react"


export default function useClient() {
    const [language, setLanguage] = useState('')

    const { data: session, status } = useSession()
    useEffect(() => {
        const lang = useLanguage(session, status)
        setLanguage(lang)
    }, [])

    return {
        language,
        session
    }
}