import Header from "../../components/header/header";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import { ReactNode } from "react";
import LanguageSwitcherDropdown from "../../components/language-switcher-dropdown/language-switcher-dropdown";
import ThemeToggleButton from "../../components/theme-toggle-button/theme-toggle-button";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            <Breadcrumbs />
            <LanguageSwitcherDropdown />
            <ThemeToggleButton />
            <main>{children}</main>
            {}
        </div>
    );
};

export default Layout;
