import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const AuthorizationForm = ({ isVisible, setIsVisible }) => {
    const GLOBAL_VALUES = useSelector((state) => state.globalStringValues);
    const [notification, setNotification] = useState();

    async function authorizeAdmin(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const res = await fetch(GLOBAL_VALUES.serverUrl + '/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        if (res.status === 200) {
            setNotification({
                status: 200,
                message: 'Авторизация произведена успешно.'
            });
        } else {
            setNotification({
                status: 401,
                message: 'Неудачная попытка авторизации.'
            });
        }
    }

    return (
        isVisible && (
            <div className="absolute inset-0 ml-12 flex items-center justify-start bg-black bg-opacity-80">
                <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
                    <button
                        className="absolute right-2 top-0 text-2xl text-black"
                        onClick={() => setIsVisible(false)}
                    >
                        &times;
                    </button>
                    <h2 className="mb-6 text-center text-3xl font-bold text-[#000000]">
                        Войти как администратор
                    </h2>
                    <form onSubmit={authorizeAdmin}>
                        <div className="mb-4">
                            <label
                                className="mb-2 block font-semibold text-black"
                                htmlFor="username"
                            >
                                Имя пользователя
                            </label>
                            <input
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-[#d9c01e] focus:outline-none"
                                type="text"
                                id="username"
                                placeholder="Введите имя пользователя"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="mb-2 block font-semibold text-black"
                                htmlFor="password"
                            >
                                Пароль
                            </label>
                            <input
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-[#d9c01e] focus:outline-none"
                                type="password"
                                id="password"
                                placeholder="Введите пароль"
                            />
                        </div>
                        <div className="flex flex-col w-full justify-center items-center">
                            <button
                                className="mt-4 w-2/3 rounded-lg bg-yellow-400 py-2 font-andika-bold text-2xl text-white transition-all focus:outline-none active:mb-[-10px] active:mt-5"
                                type="submit"
                            >
                                Войти
                            </button>
                            {notification && (
                                <div className="relative">
                                    <p
                                        className={`absolute text-nowrap text-sm -left-28  ${notification.status === 200 ? 'text-green-500' : 'text-red-800'} `}
                                    >
                                        {notification.message}
                                    </p>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default AuthorizationForm;
