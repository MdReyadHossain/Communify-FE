import { useLocalStorage } from 'use-hooks';
import { useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function SwitchTheme() {
    const [theme, setTheme] = useLocalStorage('light');
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    //modify data-theme when theme changes
    useEffect(() => {
        const body = document.documentElement;
        body.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <button className="flex items-center justify-center ml-5 text-gray-500" onClick={toggleTheme}>
            {theme === 'dark' ? (
                <FaMoon className="w-7 h-7" />
            ) : (
                <FaSun className="w-7 h-7" />
            )}
        </button>
    );
};
