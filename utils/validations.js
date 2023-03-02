import languageDefinder from "./languageDefinder"

export const registerValidation = (req) => {
    const { username, password, email, confirmPassword, lang } = req.body
    const errors = []
    const language = languageDefinder(req.query.lang)
    if (username && password && email && confirmPassword && lang) {
        if (username.length < 3) {
            errors.push(language.res.usernameLengthError)
        }

        if (password === confirmPassword) {
            if (password.length < 3) {
                errors.push(language.res.passwordLengthError)
            }
        } else {
            errors.push(language.res.passwordMatchError)
        }

        if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            errors.push(language.res.emailValidError)
        }
    } else {
        errors.push(language.res.missingFields)
    }

    return errors
}

export const loginValidation = (req) => {
    const { email, password } = req.body
    const errors = []

    const language = languageDefinder(req.query.lang)
    if (email && password) {
    } else {
        errors.push(language.res.missingFields)
    }

    return errors
}

export const changePasswordValidation = (req) => {
    const { password, newPassword, confirmNewPassword } = req.body
    const errors = []

    const language = languageDefinder(req.query.lang)
    if (newPassword && confirmNewPassword && password) {
        if (newPassword === confirmNewPassword) {
            if (!(newPassword === password)) {
                if (newPassword.length < 3) {
                    errors.push(language.res.passwordLengthError)
                }
            } else {
                errors.push(language.res.passwordUniqueError)
            }
        } else {
            errors.push(language.res.passwordMatchError)
        }
    } else {
        errors.push(language.res.missingFields)
    }

    return errors
}

export const createUserValidation = (req) => {
    const { username, password, email, role, lang, confirmPassword } = req.body
    const errors = []

    const language = languageDefinder(req.query.lang)
    if (username && password && email && role && lang && confirmPassword) {
        if (username.length < 3) {
            errors.push(language.res.usernameLengthError)
        }

        if (password === confirmPassword) {
            if (password.length < 3) {
                errors.push(language.res.passwordLengthError)
            }
        } else {
            errors.push(language.res.passwordMatchError)
        }

        if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            errors.push(language.res.emailValidError)
        }
    } else {
        errors.push(language.res.missingFields)
    }

    return errors
}

export const createCategoryValidation = (req) => {
    const { title, description, code } = req.body
    const errors = []

    const language = languageDefinder(req.query.lang)
    if (title && code && description) {
        if (title.length < 3) {
            errors.push(language.res.nameLengthError)
        }

        if (code.length < 3) {
            errors.push(language.res.codeLengthError)
        }

        if (description.length < 20) {
            errors.push(language.res.codeLengthError)
        }
    } else {
        errors.push(language.res.missingFields)
    }

    return errors
}

export const createOfficeValidation = (req) => {
    const { address, building, city, country, start, end, phone, id, title} = req.body
    const errors = []

    const language = languageDefinder(req.query.lang)
    if (address && building && city && country && start && end && phone && id && title) {
    } else {
        errors.push(language.res.missingFields)
    }

    return errors
}

export const createProductValidation = (req) => {
    const { title, description, price, category, stock, id, weight, quantity, flavors, ingredients } = req.body
    const errors = []

    const language = languageDefinder(req.query.lang)
    if (title && price && description && category && stock && id && weight && quantity && flavors, ingredients) {
        if (title.length < 3) {
            errors.push(language.res.nameLengthError)
        }
        if (description.length < 5) {
            errors.push(language.res.descriptionLengthError)
        }
    } else {
        errors.push(language.res.missingFields)
    }
    return errors
}

export const createOrderValidation = (req) => {
    const { address, city, zipCode, district, country } = req.body
    const errors = []

    const language = languageDefinder(req.query.lang)
    if (address && city && zipCode && district && country) {
    } else {
        errors.push(language.res.missingFields)
    }
    return errors
}