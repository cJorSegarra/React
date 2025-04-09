import React, { useEffect, useState } from "react";

const ThemeToggleButton = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);

    const changeTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(e.target.value as "light" | "dark");
    };

    return (
        <div className="theme-switcher">
            <select onChange={changeTheme} defaultValue={theme}>
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
            </select>
        </div>
    );
};

export default ThemeToggleButton;
