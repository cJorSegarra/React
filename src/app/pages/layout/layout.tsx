import Header from "../../components/header/header";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import { ReactNode } from "react";
import LanguageSwitcherDropdown from "../../components/language-switcher-dropdown/language-switcher-dropdown";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            <Breadcrumbs />
            <LanguageSwitcherDropdown />
            <main>{children}</main>
            {}
        </div>
    );
};

export default Layout;
