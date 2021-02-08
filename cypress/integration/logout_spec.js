/* eslint-disable no-undef */
describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test-id="signin-email"]').type('cypress@teste.pt')

    cy.get('[data-test-id="signin-pw"]').type('123456')

    cy.contains('Login').click()
    cy.contains('what will you track')
  })

  it('works', () => {
    cy.get('[data-test-id="sidebar-icon"]').click()
    cy.contains('Logout').click()
    cy.contains('Welcome back')
  })
})
