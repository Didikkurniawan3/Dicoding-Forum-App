/**
 *  E2E Scenario
 * 
 * ~ create thread spec (with modal)
    * - create thread spec
    * - should display create thread page correctly
    * - should create thread when title and content are provided
*/

import { faker } from '@faker-js/faker';

describe('create thread spec (with modal)', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/Login');
    
    cy.get('input[placeholder="Email"]').should('be.visible').type('didik2584@gmail.com');
    cy.get('input[placeholder="Password"]').should('be.visible').type('hutama12');
    cy.get('button').contains(/^Login$/).click();

    cy.get('a[href="#add_thread_modal"]').should('be.visible');
  });

  it('should display create thread modal correctly', () => {
    cy.get('a[href="#add_thread_modal"]').click();

    cy.get('#add_thread_modal').should('be.visible');
    cy.get('input[placeholder="Thread Title"]').should('be.visible');
    cy.get('input[placeholder="Thread Category"]').should('be.visible');
    cy.get('.label-text').contains('Content').should('be.visible');
    cy.get('button').contains(/^Add Thread$/).should('be.visible');
  });

  it('should create thread from modal when title and content are provided', () => {
    const title = faker.lorem.words(3);
    const category = faker.word.noun();
    const content = faker.lorem.paragraph();

    cy.get('a[href="#add_thread_modal"]').click();

    cy.get('input[placeholder="Thread Title"]').type(title);
    cy.get('input[placeholder="Thread Category"]').type(category);
    cy.get('.w-md-editor-text textarea').type(content);
    cy.get('button').contains(/^Add Thread$/).click();
    cy.contains(title).should('exist');
  });
});
