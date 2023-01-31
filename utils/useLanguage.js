import { lang } from "@/constants"

export default function useLanguage(user, context) {
    function languageSelector() {
        if (user) {
            const language = user.lang
            for (let i = 0; i < lang.length; i++) {
                if (language === lang[i].lang) {
                    return i
                }
            }
        } else {
            if (context) {
                const language = context.req.headers["accept-language"].split(",")[0].split("-")[0]
                for (let i = 0; i < lang.length; i++) {
                    if (language === lang[i].lang) {
                        return i
                    }
                }
            } else {
                const language = window.navigator.language.split("-")[0]
                for (let i = 0; i < lang.length; i++) {
                    if (language === lang[i].lang) {
                        return i
                    }
                }
            }
        }
    }

    return lang[languageSelector()]
}