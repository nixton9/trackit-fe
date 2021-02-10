/* eslint-disable no-undef */
describe('Sign In', () => {
  it('test', () => {
    cy.visit('/')
    cy.get('[data-test-id="signin-email"]').type('cypress@teste.pt')

    cy.get('[data-test-id="signin-pw"]').type('123456')

    cy.contains('Login').click()

    cy.contains('Unexpected')
  })

  it('login works with correct info', () => {
    cy.visit('/')
    cy.get('[data-test-id="signin-email"]').type('cypress@teste.pt')

    cy.get('[data-test-id="signin-pw"]').type('123456')

    cy.contains('Login').click()

    cy.contains('what will you track today?')
  })

  it('login fails with incorrect email', () => {
    cy.visit('/')
    cy.get('[data-test-id="signin-email"]')
      .type('test@gnaidl.com')
      .should('have.value', 'test@gnaidl.com')

    cy.get('[data-test-id="signin-pw"]')
      .type('123456')
      .should('have.value', '123456')

    cy.contains('Login').click()

    cy.contains('There is no account with that email address')
  })
})
