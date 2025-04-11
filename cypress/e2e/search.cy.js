describe("search functionality", () => {
    const username = "1234";
    const password = "1234";
    const searchTerm = "cypress";

    beforeEach(() => {
        cy.visit("/login");
        cy.get('[data-cy-test="username"]').type(username);
        cy.get('[data-cy-test="password"]').type(`${password}{enter}`);
    });

    it("should type in the search input", () => {
        cy.get('[data-cy-test="search-input"]').type(searchTerm);
        cy.get('[data-cy-test="search-input"]').should(
            "have.value",
            searchTerm
        );
    });
});
