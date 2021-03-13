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

  it('creates categories on settings, displays on view', () => {
    const category = generateRandomString()
    cy.get('[data-test-id="tasks-settings-icon"]').click()
    cy.get('[data-test-id="categories-add-icon"]').click()
    cy.get('[data-test-id="categories-name-input"]')
      .scrollIntoView()
      .type(category, { force: true })
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains(category)
    cy.get('[data-test-id="drawer-overlay"]').click({
      multiple: true,
      force: true
    })
    cy.get('[id="tasks-view"]').click()
    cy.contains(category)
  })

  it('creates a task, displays on view and deletes it', () => {
    const taskTitle = generateRandomString()
    cy.get('[data-test-id="add-task"]').click()
    cy.get('[data-test-id="add-task-title-input"]').type(taskTitle)
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains(taskTitle)
    cy.get(`.single-task:contains(${taskTitle})`).click()
    cy.get('[data-test-id="three-dots-menu"]').click()
    cy.get('[data-test-id="menu-item-1"]').click()
    cy.get('.confirm').click()
    cy.contains(taskTitle).should('not.exist')
  })

  it('creates a task after creating a new inbox', () => {
    const taskTitle = generateRandomString()
    const inboxTitle = generateRandomString()
    cy.get('[data-test-id="add-task"]').click({ force: true })
    cy.get('[data-test-id="add-task-title-input"]').type(taskTitle)
    cy.get('#add-inbox').click()
    cy.get('li').contains('Create new').click()
    cy.get('[data-test-id="categories-name-input"]').type(inboxTitle, {
      force: true
    })
    cy.get('[data-test-id="submit-btn"]').first().click({ force: true })
    cy.contains(inboxTitle)
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains(taskTitle)
    cy.contains(inboxTitle)
  })

  it('date input works', () => {
    cy.get('[data-test-id="add-task"]').click()
    cy.get('[data-test-id="add-task-date-input"]').click()
    cy.contains('Today')
    cy.contains('Tomorrow')
    cy.contains('Select Date')
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
