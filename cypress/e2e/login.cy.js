describe("login", () => {
    const username = "1234";
    const password = "1234";

    before(() => {
        cy.visit("/login");
        cy.get('[data-cy-test="username"').type(username);
        cy.get('[data-cy-test="password"').type(`${password}{enter}`);
    });

    it("logged in", () => {});
});
