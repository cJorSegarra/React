import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcherDropdown = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();

    const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <div className="language-switcher">
            <select onChange={changeLanguage} defaultValue={i18n.language}>
                <option value="en">{t("language_en")}</option>
                <option value="es">{t("language_es")}</option>
            </select>
        </div>
    );
};

export default LanguageSwitcherDropdown;
