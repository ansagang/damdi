import languageDefinder from "./languageDefinder"

export const registerValidation = (req) => {
    const { username, password, email, confirmPassword, lang } = req.body
    const errors = []

    const language = languageDefinder(req.query.lang)
    if (username && password && email && confirmPassword && lang) {
        if (username.length < 3) {
            errors.push(language.usernameLengthError)
        }

        if (password === confirmPassword) {
            if (password.length < 3) {
                errors.push(language.passwordLengthError)
            }
        } else {
            errors.push(language.passwordMatchError)
        }

        if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            errors.push(language.emailValidError)
        }
    } else {
        errors.push(language.missingFields)
    }

    return errors
}

export const loginValidation = (req) => {
    const { email, password } = req.body
    const errors = []

    const language = languageDefinder(req.query.lang)
    if (email && password) {
    } else {
        errors.push(language.missingFields)
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
                    errors.push(language.passwordLengthError)
                }
            } else {
                errors.push(language.passwordUniqueError)
            }
        } else {
            errors.push(language.passwordMatchError)
        }
    } else {
        errors.push(language.missingFields)
    }

    return errors
}

export const createUserValidation = (req) => {
    const { username, password, email, role, lang, confirmPassword } = req.body
    const errors = []

    const language = languageDefinder(req.query.lang)
    if (username && password && email && role && lang && confirmPassword) {
        if (username.length < 3) {
            errors.push(language.usernameLengthError)
        }

        if (password === confirmPassword) {
            if (password.length < 3) {
                errors.push(language.passwordLengthError)
            }
        } else {
            errors.push(language.passwordMatchError)
        }

        if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            errors.push(language.emailValidError)
        }
    } else {
        errors.push(language.missingFields)
    }

    return errors
}

export const createCategoryValidation = (req) => {
    const { name, code } = req.body
    const errors = []

    const language = languageDefinder(req.query.lang)
    if (name && code) {
        if (name.length < 3) {
            errors.push(language.nameLengthError)
        }

        if (code.length < 3) {
            errors.push(language.codeLengthError)
        }
    } else {
        errors.push(language.missingFields)
    }

    return errors
}

export const createCollectionValidation = (req) => {
    const { name, description, code } = req.body
    const errors = []

    const language = languageDefinder(req.query.lang)
    if (name && code && description) {
        if (name.length < 3) {
            errors.push(language.nameLengthError)
        }

        if (code.length < 3) {
            errors.push(language.codeLengthError)
        }

        if (description.length < 5) {
            errors.push(language.descriptionLengthError)
        }
    } else {
        errors.push(language.missingFields)
    }
    return errors
}