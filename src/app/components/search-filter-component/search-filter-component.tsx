import React from "react";
import { useTranslation } from "react-i18next";

type SearchFilterProps = {
    searchTerm: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchFilter = ({ searchTerm, handleSearch }: SearchFilterProps) => {
    const { t } = useTranslation();

    return (
        <input
            data-cy-test="search-input"
            type="text"
            placeholder={t("search_by_title")}
            value={searchTerm}
            onChange={handleSearch}
        />
    );
};

export default SearchFilter;
