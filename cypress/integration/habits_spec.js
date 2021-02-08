/* eslint-disable no-undef */
import { generateRandomString } from '../../src/utils/globalHelpers'

describe('Habits', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test-id="signin-email"]').type('cypress@teste.pt')

    cy.get('[data-test-id="signin-pw"]').type('123456')

    cy.contains('Login').click()
    cy.contains('Habits')
    cy.visit('/habits')
    cy.contains('Habits')
    cy.get('[aria-label="Skip"]').click()
  })

  it('settings open and show sort', () => {
    cy.get('[data-test-id="habits-settings-icon"]').click()
    cy.contains('Sort by')
  })

  it('creates an habit & displays on view', () => {
    const habitTitle = generateRandomString()
    cy.get('[data-test-id="add-habit"]').click()
    cy.get('[data-test-id="add-habit-title-input"]').type(habitTitle)
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains(habitTitle)
    cy.get('[id="habits-view"]').click()
    cy.contains(habitTitle)
  })

  it('fails to create habit with no title', () => {
    cy.get('[data-test-id="add-habit"]').click()
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains('You need to insert a title')
  })
})
