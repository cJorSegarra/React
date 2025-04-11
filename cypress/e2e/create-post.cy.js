describe("create post", () => {
    const username = "1234";
    const password = "1234";
    const title = "Cypress Test Post";
    const body = "This is a test post created using Cypress.";

    beforeEach(() => {
        cy.visit("/login");
        cy.get('[data-cy-test="username"]').type(username);
        cy.get('[data-cy-test="password"]').type(`${password}{enter}`);
    });

    it("post has been created", () => {
        cy.get('[data-cy-test="create-post-button"]').click();
        cy.get('[data-cy-test="title"]').type(title);
        cy.get('[data-cy-test="body"]').type(body);
        cy.get('[data-cy-test="save-post"]').click();
        cy.contains(title).should("exist");
    });
});
