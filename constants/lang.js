const lang = [
    {
        lang: 'en',
        res: {
            getResult: 'Objects have been retrieved successfully',
            error: 'Error',
            addResult: 'Object has been added successfully',
            updateResult: 'Object has been updated successfully',
            deleteResult: 'Object has been deleted successfully',
            usernameLengthError: 'Username must be at least 3 characters',
            passwordLengthError: 'Password must be at least 3 characters',
            passwordMatchError: 'Passwords do not match',
            missingFields: 'Missing fields',
            emailValidError: 'Email is not valid',
            passwordUniqueError: 'Password must be unique',
            nameLengthError: 'Name must be at least 3 characters',
            codeLengthError: 'Code must be at least 3 characters',
            descriptionLengthError: 'Description must be at least 5 characters',
            emailExistsError: 'Email already exists',
            registrationResult: 'Successful registration',
            loginResult: 'Successful login',
            passwordIncorrectError: 'Incorrect password',
            userNotFoundError: 'User not found',
            userResult: 'Account has been retrieved successfully',
            sessionNotFoundError: 'Session not found',
            sessionRequiredError: 'Session is required',
            userDeleteResult: 'User has been deleted successfully',
            seesionDeleteResult: 'Session has been deleted successfully',
            passwordChangeResult: 'Password has been changed successfully',
            emailChangeResult: 'Email has been changed successfully',
            imageChangeResult: 'Image has been changed successfully',
            languageChangeResult: 'Language has been changed successfully',
            usernameChangeResult: 'Username has been changed successfully',
            wishlistAddResult: 'Product has been added to wishlist successfuly',
            wishlistRemoveResult: 'Product has been deleted from wishlist successfully',
        },
        title: 'English',
        login: {
            stepOne: {
                title: "Login to your account",
                inputs: {
                    username: "Username",
                    password: "Password",
                    email: "Email"
                },
                buttons: {
                    rememberMe: "Remember me",
                    login: "Login",
                    dontHaveAccount: "Do not have an account?"
                }
            }
        },
        register: {
            stepOne: {
                title: "Register",
                inputs: {
                    username: "Username",
                    password: "Password",
                    confirmPassword: "Confirm password",
                    email: "Email"
                },
                buttons: {
                    register: "Register",
                    alreadyHaveAccount: "Already have an account?"
                }
            },
            stepTwo: {
                title: "Choose your profile picture",
                inputs: {
                    img: "Select profile image"
                },
                buttons: {
                    done: "Done",
                    skip: "Skip"
                }
            },
            stepThree: {
                title: "Choose your profile language",
                inputs: {
                    language: "Select language"
                },
                buttons: {
                    done: "Done",
                    skip: "Skip"
                }
            }
        }
    },
    {
        lang: 'ru',
        res: {
            getResult: 'Объекты были успешно отправлены',
            error: 'Ошибка',
            addResult: 'Объект был успешно добавлен',
            updateResult: 'Объект был успешно обновлен',
            deleteResult: 'Обьект был успешно удален',
            usesrnameLengthError: 'Никнейм должен быть не меньше 3 символов',
            passwordLengthError: 'Пароль должен быть не меньше 3 символов',
            passwordMatchError: 'Пароли не совпадают',
            missingFields: 'Заполните все поля',
            emailValidError: 'Неверная электронная почта',
            passwordUniqueError: 'Пароль должен быть уникальным',
            nameLengthError: 'Название должно быть не меньше 3 символов',
            codeLengthError: 'Код должен быть не меньше 3 символов',
            descriptionLengthError: 'Описание должно быть не меньше 5 символов',
            emailExistsError: 'Данная электронная почта уже существует',
            registrationResult: 'Успешная регистрация',
            loginResult: 'Успешный вход в аккаунт',
            passwordIncorrectError: 'Неверный пароль',
            userNotFoundError: 'Пользователь не найден',
            userResult: 'Аккаунт был успешно доставлен',
            sessionNotFoundError: 'Сессия не найдена',
            sessionRequiredError: 'Сессия необходима',
            userDeleteResult: 'Аккаунт был успешно удален',
            sessionDeleteResult: 'Сессия была успешно удалена',
            passwordChangeResult: 'Пароль был успешно изменен',
            emailChangeResult: 'Электронная почта была успешно изменена',
            imageChangeResult: 'Аватар был успешно изменен',
            languageChangeResult: 'Язык был успешно изменен',
            usernameChangeResult: 'Никнейм был успешно изменен',
            wishlistAddResult: 'Продукт был успешно добавлен в список желаемых',
            wishlistRemoveResult: 'Продукт был успешно удален из списка желаемых',
        },
        title: 'Русский',
        login: {
                title: "Войдите в аккаунт",
                inputs: {
                    username: "Логин",
                    password: "Пароль",
                    email: "Электронная почта"
                },
                buttons: {
                    rememberMe: "Запомните меня",
                    login: "Войти",
                    dontHaveAccount: "У вас нету аккаунта?"
                }
        },
        register: {
            stepOne: {
                title: "Зарегистрироваться",
                inputs: {
                    username: "Логин",
                    password: "Пароль",
                    confirmPassword: "Подтверждение пароля",
                    email: "Электронная почта"
                },
                buttons: {
                    register: "Зарегистрироваться",
                    alreadyHaveAccount: "У вас уже есть аккаунт?"
                }
            },
            stepTwo: {
                title: "Выберите аватар",
                inputs: {
                    img: "Выберите аватарку"
                },
                buttons: {
                    done: "Готово",
                    skip: "Пропустить"
                }
            },
            stepThree: {
                title: "Выберите язык",
                inputs: {
                    language: "Выберите язык"
                },
                buttons: {
                    done: "Готово",
                    skip: "Пропустить"
                }
            }
        },
    }
]

export default lang