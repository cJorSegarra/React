type PaginationProps = {
    paginate: (pageNumber: number) => void;
    currentPage: number;
    totalPages: number;
};

import { useTranslation } from "react-i18next";

const Pagination = ({ paginate, currentPage, totalPages }: PaginationProps) => {
    const { t } = useTranslation();

    return (
        <div>
            <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {t("back")}
            </button>
            <span>
                {t("page")} {currentPage} {t("of")} {totalPages}
            </span>
            <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {t("next")}
            </button>
        </div>
    );
};

export default Pagination;
