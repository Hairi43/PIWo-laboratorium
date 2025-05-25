// testy dla książek i ich opisów

describe("Check bookTile", () => {
    it("Check book tile and it's values", () => {
        cy.visit("https://lab3-library.web.app/");
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.wait(500);
        cy.scrollTo('bottom')
        
        cy.get(".bookTile .bookImage").should("exist");
        cy.get(".bookTile .bookInfo .bookTitle").should("contain.text", "książka 1");
        cy.get(".bookTile .bookInfo .bookAuthor").should("contain.text", "tanjiro kamado");
        cy.get(".bookTile .bookInfo .bookDescription").should("contain.text", "qwetry");
        cy.get(".bookTile .bookInfo .bookPrice").should("contain.text", "123.23");
        cy.get(".bookTile .bookInfo .bookPages").should("contain.text", "456");
        cy.get(".bookTile .bookInfo .bookCover").should("contain.text", "miękka");
        cy.get(".bookTile .bookInfoBtn .filterNavBtn").should("exist");
    });
})