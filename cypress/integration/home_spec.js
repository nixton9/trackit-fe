/* eslint-disable no-undef */
describe('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-test-id="signin-email"]').type('cypress@teste.pt')

    cy.get('[data-test-id="signin-pw"]').type('123456')

    cy.contains('Login').click()
  })

  it('shows welcome message and all the widgets', () => {
    cy.contains('what will you track today?')
    cy.contains('Notes')
    cy.contains('Tasks')
    cy.contains('Habits')
    cy.contains('Expenses')
  })

  it('opens Sidebar when icon is clicked and links here work', () => {
    cy.get('[data-test-id="sidebar-icon"]').click()
    cy.contains('Settings').click()
    cy.url().should('include', '/settings')
  })

  it('opens Search when icon is clicked and it works', () => {
    cy.get('[data-test-id="search-icon"]').click()
    cy.get('[data-test-id="search-input"]').type('test')
    cy.get('[data-test-id="search-icon"]').click()
    cy.url().should('include', '/search/test')
  })
})
