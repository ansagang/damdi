import lang from "@/constants/lang";

function languageDefinder(language) {
    function languageSelector() {
        for (let i = 0; i < lang.length; i++) {
            if (language === lang[i].lang) {
                return i
            }
        }
    }

    return lang[languageSelector()]
}

export default languageDefinder;