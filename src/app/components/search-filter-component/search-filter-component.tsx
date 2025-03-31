import React from "react";

type SearchFilterProps = {
    searchTerm: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchFilter = ({ searchTerm, handleSearch }: SearchFilterProps) => (
    <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearch}
    />
);

export default SearchFilter;
