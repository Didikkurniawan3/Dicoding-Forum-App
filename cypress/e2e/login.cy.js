/**
 *  E2E Scenario
 * 
 * ~ Login spec
    * - should display login page correctly
    * - should prevent login when email and password are empty
    * - should prevent login when invalid email format
    * - should display toast when login email and password are wrong
    * - should display toast and redirect to home page when success login
*/

import { faker } from "@faker-js/faker";

describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
    cy.url().should("include", "/login");
  });

  it("should display login page correctly", () => {
    cy.get("body").should("be.visible");
    cy.get('[data-cy="login-email"]').should("be.visible");
    cy.get('[data-cy="login-password"]').should("be.visible");
    cy.get('[data-cy="login-button"]').should("be.visible");
  });

  it("should prevent login when email and password are empty", () => {
    cy.get('[data-cy="login-button"]').click();
    cy.url().should("include", "/login");
  });

  it("should prevent login when invalid email format", () => {
    cy.get('[data-cy="login-email"]').type("test");
    cy.get('[data-cy="login-password"]').type("test123");
    cy.get('[data-cy="login-button"]').click();
    cy.url().should("include", "/login");
  });

  it("should display toast when login email and password are wrong", () => {
    cy.get('[data-cy="login-email"]').type(faker.internet.email());
    cy.get('[data-cy="login-password"]').type(faker.string.alphanumeric(10));
    cy.get('[data-cy="login-button"]').click();
    cy.contains("Error: email or password is wrong", { timeout: 5000 })
      .scrollIntoView()
      .should("be.visible");
  });

  it("should display toast and redirect to home page when success login", () => {
    cy.get('[data-cy="login-email"]').type("user@user.com");
    cy.get('[data-cy="login-password"]').type("user@user.com");
    cy.get('[data-cy="login-button"]').click();
    cy.contains("Login success").should("be.visible");
    cy.url().should("eq", "http://localhost:5173/");
  });
});
