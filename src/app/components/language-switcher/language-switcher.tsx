import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="language-switcher">
            <button onClick={() => changeLanguage("en")}>
                {t("language_value_en")}
            </button>
            <button onClick={() => changeLanguage("es")}>
                {t("language_value_es")}
            </button>
        </div>
    );
};

export default LanguageSwitcher;
