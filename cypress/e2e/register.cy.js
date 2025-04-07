/**
 *  E2E Scenario
 * 
 * ~ Register spec
    * - should display register page correctly
    * - should prevent register when name, email and password are empty
    * - should prevent register when using invalid email format
    * - should redirect to login page when register is successful
*/

import { faker } from "@faker-js/faker"
import { v4 as uuidv4 } from 'uuid'

describe('Register spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/register')
    })

    it('should display register page correctly', () => {
        cy.get('input[placeholder="Name"]').should('be.visible')
        cy.get('input[placeholder="Email"]').should('be.visible')
        cy.get('input[placeholder="Password"]').should('be.visible')
        cy.get('button[type="submit"]').should('be.visible')
    })

    it('should prevent register when name, email and password are empty', () => {
        cy.get('button[type="submit"]').click()
        cy.url().should("eq", "http://localhost:5173/register")
    })

    it('should prevent register when using invalid email format', () => {
        cy.get('input[placeholder="Name"]').type("test user")
        cy.get('input[placeholder="Email"]').type("invalidemail")
        cy.get('input[placeholder="Password"]').type("test1234")
        cy.get('button[type="submit"]').click()

        cy.url().should("eq", "http://localhost:5173/register")
    })

    it('should redirect to login page when register is successful', () => {
        const name = faker.person.fullName()
        const email = `${uuidv4().replaceAll("-", "")}@gmail.com`
        const password = faker.internet.password(10)

        cy.get('input[placeholder="Name"]').type(name)
        cy.get('input[placeholder="Email"]').type(email)
        cy.get('input[placeholder="Password"]').type(password)
        cy.get('button[type="submit"]').click()

        cy.wait(1000)

        cy.url().should("eq", "http://localhost:5173/login")
    })
})
