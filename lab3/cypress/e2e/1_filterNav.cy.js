// testy dla filtrów

describe("Check FilterNav", () => {
    it("Check filterNav author filter", () => {
        cy.visit("https://lab3-library.web.app/");
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.wait(500);
        cy.get("#inputAuthor").type("inny mail");

        // w aplikacji jest mały bug i trzeba 2 razy kliknąć
        //  przycisk filtruj, aby filtry zadziałały
        cy.get(".filterNav .filterNavBtn").click();
        cy.get(".filterNav .filterNavBtn").click();
        cy.get(".bookTile").should("exist");
        cy.get(".bookTile").should("have.length", 1);
    });
    it("Check book cover filter", () => {
        cy.visit("https://lab3-library.web.app/");
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.wait(500);
        cy.get("input[value='miękka']").click();

        // w aplikacji jest mały bug i trzeba 2 razy kliknąć
        //  przycisk filtruj, aby filtry zadziałały
        cy.get(".filterNav .filterNavBtn").click();
        cy.get(".filterNav .filterNavBtn").click();
        cy.get(".bookTile").should("exist");
        cy.get(".bookTile").should("have.length", 2);
    });
})