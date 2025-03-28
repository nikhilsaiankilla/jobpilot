"use client";

import React, { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { setUser } from '@/lib/slicer/authSlicer';
import Cookies from 'js-cookie'

const ThemeProviders = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const setUserInRedux = () => {
            if (!user) {
                const userInLocalStorage = localStorage.getItem('user');

                if (userInLocalStorage) {
                    dispatch(setUser(JSON.parse(userInLocalStorage)));
                } else {
                    Cookies.remove('accessToken')
                    Cookies.remove('userId')
                    Cookies.remove('userId')
                }
            }
        }

        setUserInRedux();
    }, [])

    return (
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
            {children}
        </ThemeProvider>
    )
}

export default ThemeProviders