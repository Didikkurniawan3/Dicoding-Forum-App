/**
 *  E2E Scenario
 * 
 * ~ leaderboard spec
    * - should show error when login with invalid credentials
    * - should display leaderboard page correctly
*/

import { faker } from '@faker-js/faker'

describe('leaderboard spec', () => {
  it('should show error when login with invalid credentials', () => {
    cy.visit('http://localhost:5173/Login');

    cy.get('input[placeholder="Email"]').should('be.visible').type(faker.internet.email());
    cy.get('input[placeholder="Password"]').should('be.visible').type(faker.internet.password());
    cy.get('button').contains(/^Login$/).click();

    cy.contains('email or password is wrong').should('be.visible');
  });

  describe('after successful login', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/Login');
  
      cy.get('input[placeholder="Email"]').should('be.visible').type('didik2584@gmail.com');
      cy.get('input[placeholder="Password"]').should('be.visible').type('hutama12');
      cy.get('button').contains(/^Login$/).click();
    });
  
    it('should display leaderboard page correctly', () => {
      cy.visit('http://localhost:5173/Leaderboard');
  
      cy.get('h2').contains(/^Leaderboard$/).should('be.visible');
      cy.get('th').contains(/^User$/).should('be.visible');
      cy.get('th').contains(/^Score$/).should('be.visible');
    });
  });
});
