// testy do przełączania stron i czy formularz istnieje wraz z inputami

describe("Check navBar", () => {
    it("Check navigation bar links", () => {
        cy.visit("https://lab3-library.web.app/");
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.wait(500);
        cy.get("a[href='/new']").click();

        cy.get(".add-book-form").should("exist");
        cy.get("input[class='title']").should("exist");
        cy.get("input[class='author']").should("exist");
        cy.get("input[class='price']").should("exist");
        cy.get("input[class='pages']").should("exist");

        cy.scrollTo('bottom')

        cy.get("select[class='cover']").should("exist");
        cy.get("select[class='cover'] option").eq(0).should("have.value", "");
        cy.get("select[class='cover'] option").eq(1).should("have.value", "miękka");
        cy.get("select[class='cover'] option").eq(2).should("have.value", "twarda");
        
        cy.get("textarea[class='description']").should("exist");
        cy.get("input[type='file']").should("exist");
        cy.get(".navBtn").should("exist");
    });
})