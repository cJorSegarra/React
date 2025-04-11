import { useTranslation } from "react-i18next";
import "./pagination-component.scss";

type PaginationProps = {
    paginate: (pageNumber: number) => void;
    currentPage: number;
    totalPages: number;
};

const Pagination = ({ paginate, currentPage, totalPages }: PaginationProps) => {
    const { t } = useTranslation();

    return (
        <div className="pagination">
            <button
                data-cy-test="back-button"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {t("back")}
            </button>
            <span>
                {t("page")} {currentPage} {t("of")} {totalPages}
            </span>
            <button
                data-cy-test="next-button"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {t("next")}
            </button>
        </div>
    );
};

export default Pagination;
