describe("delete post", () => {
    const username = "1234";
    const password = "1234";
    const postId = 32;

    beforeEach(() => {
        cy.visit("/login");
        cy.get('[data-cy-test="username"]').type(username);
        cy.get('[data-cy-test="password"]').type(`${password}{enter}`);

        for (let i = 0; i < 3; i++) {
            cy.get('[data-cy-test="next-button"]').click();
        }
    });

    it("should delete the post and handle the confirmation alert", () => {
        cy.on("window:confirm", (text) => {
            expect(text).to.equal("Are you sure you want to delete this post?");
            return true;
        });

        cy.get(`[data-cy-test="delete-button-${postId}"]`).click();

        cy.contains(`Post with ID ${postId}`).should("not.exist");
    });
});
