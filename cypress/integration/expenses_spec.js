/* eslint-disable no-undef */
import { generateRandomString } from '../../src/utils/globalHelpers'

describe('Expenses', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-test-id="signin-email"]').type('cypress@teste.pt')

    cy.get('[data-test-id="signin-pw"]').type('123456')

    cy.contains('Login').click()
    cy.contains('Expenses')
    cy.visit('http://localhost:3000/expenses')
    cy.contains('Expenses')
  })

  it('creates categories on settings & displays on category input', () => {
    const category = generateRandomString()
    cy.get('[data-test-id="expenses-settings-icon"]').click()
    cy.get('[data-test-id="expenses-add-icon"]').click()
    cy.get('[data-test-id="categories-name-input"]')
      .scrollIntoView()
      .type(category)
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains(category)
    cy.get('[data-test-id="drawer-overlay"]').click({
      multiple: true,
      force: true
    })
    cy.get('[data-test-id="add-expense"]').click()
    cy.get('[id="add-category"]').click()
    cy.contains(category)
  })

  it('creates an expense & displays on view', () => {
    const expenseTitle = generateRandomString()
    cy.get('[data-test-id="add-expense"]').click()
    cy.get('[data-test-id="fluid-input"]').type(22)
    cy.get('[data-test-id="add-expense-title-input"]').type(expenseTitle)
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains(expenseTitle)
  })

  it('fails to create expense with no value', () => {
    cy.get('[data-test-id="add-expense"]').click()
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains('You need to insert a value')
  })
})
