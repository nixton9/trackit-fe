/* eslint-disable no-undef */
import { generateRandomString } from '../../src/utils/globalHelpers'

describe('Tasks', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test-id="signin-email"]').type('cypress@teste.pt')

    cy.get('[data-test-id="signin-pw"]').type('123456')

    cy.contains('Login').click()
    cy.contains('Tasks')
    cy.visit('/tasks')
    cy.contains('Tasks')
    cy.get('[aria-label="Skip"]').click()
  })

  it('creates categories on settings & displays on view', () => {
    const category = generateRandomString()
    cy.get('[data-test-id="tasks-settings-icon"]').click()
    cy.get('[data-test-id="categories-add-icon"]').click()
    cy.get('[data-test-id="categories-name-input"]')
      .scrollIntoView()
      .type(category)
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains(category)
    cy.get('[data-test-id="drawer-overlay"]').click({
      multiple: true,
      force: true
    })
    cy.get('[id="tasks-view"]').click()
    cy.contains(category)
  })

  it('creates a task & displays on view', () => {
    const taskTitle = generateRandomString()
    cy.get('[data-test-id="add-task"]').click()
    cy.get('[data-test-id="add-task-title-input"]').type(taskTitle)
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains(taskTitle)
  })

  it('date input works', () => {
    cy.get('[data-test-id="add-task"]').click()
    cy.get('[data-test-id="add-task-date-input"]').click()
    cy.contains('Today')
    cy.contains('Tomorrow')
    cy.contains('Custom Date')
    cy.contains('No Date')
  })

  it('Add menu closes', () => {
    cy.get('[data-test-id="add-task"]').click()
    cy.contains('Create a task')
    cy.get('[data-test-id="three-dots-menu"]').click()
    cy.contains('Cancel').click()
    cy.contains('Create a task').should('not.exist')
  })

  it('Done tasks page works', () => {
    cy.get('[data-test-id="done-tasks-link"]').click()
    cy.contains('Completed Tasks')
  })

  it('fails to create task with no title', () => {
    cy.get('[data-test-id="add-task"]').click()
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains('You need to insert a title')
  })
})
