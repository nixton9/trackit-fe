/* eslint-disable no-undef */
import { generateRandomString } from '../../src/utils/globalHelpers'

describe('Expenses', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test-id="signin-email"]').type('cypress@teste.pt')
    cy.get('[data-test-id="signin-pw"]').type('123456')
    cy.contains('Login').click()
    cy.contains('Expenses')
    cy.visit('/expenses')
    cy.contains('Expenses')
    cy.get('[aria-label="Skip"]').click()
  })

  it('creates categories on settings & displays on category input', () => {
    const category = generateRandomString()
    cy.get('[data-test-id="expenses-settings-icon"]').click()
    cy.get('[data-test-id="expenses-add-icon"]').click({ force: true })
    cy.get('[data-test-id="categories-name-input"]')
      .scrollIntoView()
      .type(category, { force: true })
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains(category)
    cy.get('[data-test-id="drawer-overlay"]').click({
      multiple: true,
      force: true
    })
    cy.get('[data-test-id="add-expense"]').click({ force: true })
    cy.get('[id="add-category"]').click()
    cy.contains(category)
  })

  it('creates an expense, displays on view & deletes it', () => {
    const expenseTitle = generateRandomString()
    cy.get('[data-test-id="add-expense"]').click({ force: true })
    cy.get('[data-test-id="fluid-input"]').type(22, { force: true })
    cy.get('[data-test-id="add-expense-title-input"]').type(expenseTitle, {
      force: true
    })
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains(expenseTitle)
    cy.get(`.single-expense:contains(${expenseTitle})`).click()
    cy.get('[data-test-id="three-dots-menu"]').click()
    cy.get('[data-test-id="menu-item-1"]').click()
    cy.get('.confirm').click()
    cy.contains(expenseTitle).should('not.exist')
  })

  it('creates an expense after creating a new category', () => {
    const expenseTitle = generateRandomString()
    const typeTitle = generateRandomString()
    cy.get('[data-test-id="add-expense"]').click({ force: true })
    cy.get('[data-test-id="fluid-input"]').type(22, { force: true })
    cy.get('[data-test-id="add-expense-title-input"]').type(expenseTitle, {
      force: true
    })
    cy.get('#add-category').click()
    cy.get('li').contains('Create new').click()
    cy.get('[data-test-id="categories-name-input"]').type(typeTitle, {
      force: true
    })
    cy.get('[data-test-id="submit-btn"]').first().click({ force: true })
    cy.contains(typeTitle)
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains(expenseTitle)
    cy.contains(typeTitle)
  })

  it('fails to create expense with no value', () => {
    cy.get('[data-test-id="add-expense"]').click({ force: true })
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains('You need to insert a value')
  })

  it('shows expenses stats', () => {
    const expenseTitle = generateRandomString()
    cy.get('[data-test-id="add-expense"]').click({ force: true })
    cy.get('[data-test-id="fluid-input"]').type(22, { force: true })
    cy.get('[data-test-id="add-expense-title-input"]').type(expenseTitle, {
      force: true
    })
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains(expenseTitle)
    cy.get('[data-test-id="expenses-stats-link"]').click({ force: true })
    cy.url().should('include', '/expenses/stats')
    cy.contains('Expenses Stats')
    cy.contains(new Date().getFullYear().toString())
    cy.contains('Monthly balance')
    cy.contains('By categories')
    cy.contains('Top expenses')
  })
})
