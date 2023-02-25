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
            accountRequired: 'Account is required',
            cartAdded: 'Product has been added to cart'
        },
        title: 'English',
        login: {
            title: 'Login',
            description: 'Log in to your account.',
            inputs: {
                email: 'Email',
                password: 'Password',
            },
            buttons: {
                login: 'Login'
            },
            links: {
                signUp: 'Sign up'
            },
            texts: {
                dontHaveAnAccount: "Don't have an account? "
            }
        },
        register: {
            title: 'Register',
            description: 'Register your account.',
            inputs: {
                email: 'Email',
                username: 'Username',
                password: 'Password',
                confirmPassword: 'Confirm your password'
            },
            buttons: {
                register: 'Register'
            },
            links: {
                signIn: 'Sign in'
            },
            texts: {
                alreadyHaveAnAccount: 'Already have an account? '
            }
        },
        home: {
            title: 'Home',
            landing: {
                title: ''
            },
            categories: {
                title: 'Categories'
            },
            trendingsList: {
                title: 'Trendings'
            },
            newArrivalsList: {
                title: 'New Arrivals'
            }
        },
        aboutUs: {
            title: 'About us'
        },
        products: {
            title: 'Products',
            sideBar: {
                title: 'Filter',
                filters: {
                    flavors: 'Flavors',
                    stock: 'Stock',
                    price: {
                        from: 'From',
                        to: 'To',
                        price: 'Price'
                    }
                },
                clearAll: 'Clear Filters'
            },
            results: {
                productsFound: 'Products found: ',
                search: 'Search results for: ',
                pagesFound: 'Pages found: '
            },
            sort: {
                trendings: 'Trendings',
                newArrivals: 'New Arrivals',
                priceAsc: 'Price: Low to High',
                priceDesc: 'Price: High to Low'
            }
        },
        account: {
            title: 'Account'
        },
        cart: {
            title: 'Cart',
            bar: {
                product: 'Product',
                quantity: 'Quantity',
                price: 'Price',
                total: 'Total'
            },
            buttons: {
                remove: 'Remove'
            }
        },
        header: {
            search: 'Search'
        },
        notFound: {
            title: 'Not Found'
        },
        product: {
            flavors: 'Flavors',
            ingredients: 'Ingredients',
            addToCart: 'Add to Cart',
            goToCart: 'Go To Cart'
            
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
            accountRequired: 'Для этой функции необходимо сначала войти в аккаунт',
            cartAdded: 'Продукт был добавлен в корзину'
        },
        title: 'Русский',
        login: {
            title: 'Логин',
            description: 'Войти в аккаунт.',
            inputs: {
                email: 'Электронная почта',
                password: 'Пароль',
            },
            buttons: {
                login: 'Войти'
            },
            links: {
                signUp: 'Зарегистрируйтесь'
            },
            texts: {
                dontHaveAnAccount: "Еще нет аккаунта? "
            }
        },
        register: {
            title: 'Регистрация',
            description: 'Зарегистрируйте ваш аккаунт.',
            inputs: {
                email: 'Электронная почта',
                username: 'Имя пользователя',
                password: 'Пароль',
                confirmPassword: 'Повторите пароль'
            },
            buttons: {
                register: 'Войти'
            },
            links: {
                signIn: 'Войти'
            },
            texts: {
                alreadyHaveAnAccount: 'Уже есть аккаунт? '
            }
        },
        home: {
            title: 'Главная',
            landing: {
                title: ''
            },
            categories: {
                title: 'Категории'
            },
            trendingsList: {
                title: 'Популярные'
            },
            newArrivalsList: {
                title: 'Новинки'
            }
        },
        aboutUs: {
            title: 'О нас'
        },
        products: {
            title: 'Продукты',
            sideBar: {
                title: 'Фильтры',
                filters: {
                    flavors: 'Вкусы',
                    stock: 'Сток',
                    price: {
                        from: 'От',
                        to: 'До',
                        price: 'Цена'
                    }
                },
                clearAll: 'Убрать фильтры'
            },
            results: {
                productsFound: 'Найдено товаров: ',
                search: 'Результаты поиска для: ',
                pagesFound: 'Найдено страниц: '
            },
            sort: {
                trendings: 'Популярные',
                newArrivals: 'Новинки',
                priceAsc: 'Цена: низкая - высокая',
                priceDesc: 'Цена: высокая - низкая'
            }
        },
        account: {
            title: 'Аккаунт'
        },
        cart: {
            title: 'Корзина',
            bar: {
                product: 'Продукт',
                quantity: 'Количество',
                price: 'Цена',
                total: 'Итого'
            },
            buttons: {
                remove: 'Удалить'
            }
        },
        header: {
            search: 'Поиск'
        },
        notFound: {
            title: 'Не найдено'
        },
        product: {
            flavors: 'Вкусы',
            ingredients: 'Ингредиенты',
            addToCart: 'Добавить в корзину',
            goToCart: 'Корзина'
        }
    }
]

export default lang