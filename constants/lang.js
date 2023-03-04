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
            accountUpdateResult: 'Account has been updated successfully',
            accountRequired: 'Account is required',
            productAddResult: 'Product has been added to cart',
            orderAddResult: 'Order has been created'
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
                dontHaveAnAccount: "Do not have an account? "
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
                title: 'damdi'
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
        cart: {
            title: 'Cart',
            bar: {
                product: 'Product',
                quantity: 'Quantity',
                price: 'Price',
                total: 'Total',
                remove: 'Remove'
            }
        },
        header: {
            search: 'Search'
        },
        product: {
            flavors: 'Flavors',
            ingredients: 'Ingredients',
            addToCart: 'Add',
            goToCart: 'Go To Cart'
        },
        account: {
            details: {
                title: 'Details',
                inputs: {
                    username: 'Username',
                    email: 'Email',
                    fullname: 'Fullname',
                    phone: 'Phone',
                    lang: 'Language',
                    country: 'Country',
                    city: 'City',
                    address: 'Address',
                    district: 'District'
                },
                buttons: {
                    save: 'Save',
                    cancel: 'Cancel'
                }
            },
            ordersHistory: {
                title: 'Orders History'
            },
            payment: {
                title: 'Payment'
            },
            signOut: 'Sign out'
        },
        order: {
            type: {
                pickup: 'Pick up',
                delivery: 'Delivery'
            },
            status: {
                status: 'Status',
                pending: 'Pending',
                delivering: 'Delivering',
                done: 'Done'
            },
            total: 'Total',
            shipping: 'Shipping',
            checkout: 'Checkout'
        },
        checkout: {
            title: 'Checkout',
            buttons: {
                order: 'Order'
            },
            inputs: {
                fullname: 'Fullname',
                phoneNumber: 'Phone number',
                country: 'Country',
                city: 'City',
                district: 'District',
                address: 'Address',
                zipCode: 'Zip Code'
            },
            contactDetails: 'Contact Details',
            order: 'Your order'
        },
        contacts: {
            title: 'Contacts'
        }
    },
    {
        lang: 'ru',
        res: {
            getResult: 'Объекты были успешно доставлены',
            error: 'Ошибка',
            addResult: 'Объект был успешно добавлен',
            updateResult: 'Объект был успешно добавлен',
            deleteResult: 'Обьект был успешно удален',
            usernameLengthError: 'Никнейм должен быть не меньше 3 символов',
            passwordLengthError: 'Пароль должен быть не меньше 3 символов',
            passwordMatchError: 'Пароли не совпадают',
            missingFields: 'Заполните все поля',
            emailValidError: 'Неверная электронная почта',
            passwordUniqueError: 'Пароль должен быть уникальным',
            nameLengthError: 'Название должно быть не меньше 3 символов',
            codeLengthError: 'Код должно быть не меньше 3 символов',
            descriptionLengthError: 'Описание должно быть не меньше 5 символов',
            emailExistsError: 'Данная электронная почта уже существует',
            registrationResult: 'Успешная регистрация',
            loginResult: 'Успешный вход в аккаунт',
            passwordIncorrectError: 'Неверный пароль',
            userNotFoundError: 'Пользователь не найден',
            userResult: 'Аккаунт был успешно доставлен',
            sessionNotFoundError: 'Сессия не найдена',
            sessionRequiredError: 'Сессия необходимаd',
            userDeleteResult: 'Аккаунт был успешно удален',
            seesionDeleteResult: 'Сессия была успешно удален',
            accountUpdateResult: 'Аккаунт был успешно обновлен',
            accountRequired: 'Для начала войдите в аккаунт',
            productAddResult: 'Продукт был добавлен в корзину',
            orderAddResult: 'Заказ был оформлен'
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
                title: 'damdi'
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
        cart: {
            title: 'Корзина',
            bar: {
                product: 'Продукт',
                quantity: 'Количество',
                price: 'Цена',
                total: 'Итого',
                remove: 'Удалить'
            }
        },
        header: {
            search: 'Поиск'
        },
        product: {
            flavors: 'Вкусы',
            ingredients: 'Ингредиенты',
            addToCart: 'Добавить',
            goToCart: 'Корзина'
        },
        account: {
            details: {
                title: 'Информация',
                inputs: {
                    username: 'Имя пользователя',
                    email: 'Электронная почта',
                    fullname: 'Полное имя',
                    phone: 'Телефон',
                    lang: 'Язык',
                    country: 'Страна',
                    city: 'Город',
                    address: 'Адрес',
                    district: 'Район'
                },
                buttons: {
                    save: 'Сохранить',
                    cancel: 'Отменить'
                }
            },
            ordersHistory: {
                title: 'История Заказов'
            },
            payment: {
                title: 'Оплата'
            },
            signOut: 'Выйти'
        },
        order: {
            type: {
                pickup: 'Самовывоз',
                delivery: 'Доставка'
            },
            status: {
                status: 'Статус',
                pending: 'В ожидании',
                delivering: 'Доставляется',
                done: 'Готово'
            },
            total: 'Итого',
            shipping: '',
            checkout: 'Оформление',
        },
        checkout: {
            title: 'Оформление заказа',
            buttons: {
                order: 'Заказать'
            },
            inputs: {
                fullname: 'ФИО',
                phoneNumber: 'Номер телефона',
                country: 'Страна',
                city: 'Город',
                district: 'Район',
                address: 'Адрес',
                zipCode: 'Почтовый индекс'
            },
            contactDetails: 'Контактная информация',
            order: 'Ваш заказ'
        },
        contacts: {
            title: 'Контакты'
        }
    }
]

export default lang