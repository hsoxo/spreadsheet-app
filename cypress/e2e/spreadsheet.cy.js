describe("test spreadsheet", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display correct values", () => {
    cy.get('[data-testid="cell-A1"]').click().type("1{enter}");
    cy.get('[data-testid="cell-C2"]').click().type("2{enter}");
    cy.get('[data-testid="cell-E4"]').click().type("=A1+C2{enter}");
    cy.get('[data-testid="cell-A4"]').click().type("=E4+C2{enter}");

    cy.get('[data-testid="cell-A1"]').should("have.text", 1);
    cy.get('[data-testid="cell-C2"]').should("have.text", 2);
    cy.get('[data-testid="cell-E4"]').should("have.text", 3);
    cy.get('[data-testid="cell-A4"]').should("have.text", 5);
  });

  it("should throw error", () => {
    cy.get('[data-testid="cell-A1"]').click().type("1{enter}");
    cy.get('[data-testid="cell-C2"]').click().type("=A1+E2{enter}");
    cy.get('[data-testid="cell-E2"]').click().type("=A1+C2{enter}");

    cy.get('[data-testid="cell-A1"]').should("have.text", 1);
    cy.get('[data-testid="cell-C2"]').should("have.text", "#CIRCULAR_REF");
    cy.get('[data-testid="cell-E2"]').should("have.text", "#CIRCULAR_REF");
  });
});
