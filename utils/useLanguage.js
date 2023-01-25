import lang from "@/constants/lang"

export default function useLanguage(session, status) {
    function languageSelector() {
            if (status !== 'loading') {
                if (session){
                    const language = session.user.lang
                    for (let i = 0; i < lang.length; i++) {
                        if (language === lang[i].lang) {
                            return i
                        }
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

    return lang[languageSelector()]
}