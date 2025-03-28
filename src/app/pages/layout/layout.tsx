import Header from "../../components/header/header";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            <Breadcrumbs />
            <main>{children}</main>
            {}
        </div>
    );
};

export default Layout;
