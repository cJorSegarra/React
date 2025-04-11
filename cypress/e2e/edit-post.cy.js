describe("edit post", () => {
    const username = "1234";
    const password = "1234";
    const editedTitle = "Cypress Test Post Edited";
    const editedBody = "This is a test post edited using Cypress.";
    const postId = 33;

    beforeEach(() => {
        cy.visit("/login");
        cy.get('[data-cy-test="username"]').type(username);
        cy.get('[data-cy-test="password"]').type(`${password}{enter}`);

        for (let i = 0; i < 3; i++) {
            cy.get('[data-cy-test="next-button"]').click();
        }
    });

    it("post has been edited", () => {
        cy.get(`[data-cy-test="edit-button-${postId}"]`).click();
        cy.get('[data-cy-test="edit-title"]').clear().type(editedTitle);
        cy.get('[data-cy-test="edit-body"]').clear().type(editedBody);
        cy.get('[data-cy-test="edit-save-button"]').click();
        cy.contains(editedTitle).should("exist");
    });
});
