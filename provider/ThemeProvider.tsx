"use client";

import React from 'react'
import { ThemeProvider } from 'next-themes'

const ThemeProviders = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
            {children}
        </ThemeProvider>
    )
}

export default ThemeProviders