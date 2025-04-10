import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ThemeToggleButton = () => {
    const { t } = useTranslation();
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
                <option value="light">{t("light_mode")}</option>
                <option value="dark">{t("dark_mode")}</option>
            </select>
        </div>
    );
};

export default ThemeToggleButton;
