/* eslint-disable no-undef */
import { generateRandomString } from '../../src/utils/globalHelpers'

describe('Notes', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test-id="signin-email"]').type('cypress@teste.pt')

    cy.get('[data-test-id="signin-pw"]').type('123456')

    cy.contains('Login').click()
    cy.contains('Notes')
    cy.visit('/notes')
    cy.contains('Notes')
    cy.get('[aria-label="Skip"]').click()
  })

  it('creates tags on settings & displays on view', () => {
    const tag = generateRandomString()
    cy.get('[data-test-id="notes-settings-icon"]').click()
    cy.get('[data-test-id="tags-add-icon"]').click()
    cy.get('[data-test-id="tags-name-input"]').scrollIntoView().type(tag)
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains(tag)
    cy.get('[data-test-id="drawer-overlay"]').click({
      multiple: true,
      force: true
    })
    cy.get('[id="notes-view"]').click()
    cy.contains(tag)
  })

  it('creates a note, displays on view & deletes it', () => {
    const noteTitle = generateRandomString()
    const noteContent = generateRandomString()
    cy.get('[data-test-id="add-note"]').click()
    cy.get('[data-test-id="add-note-title-input"]').type(noteTitle)
    cy.get(
      '[data-placeholder="Start writing your note here"] p'
    ).type(noteContent, { force: true })
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.get(`.single-note:contains(${noteTitle})`).click()
    cy.get('[data-test-id="three-dots-menu"]').click()
    cy.get('[data-test-id="menu-item-1"]').click()
    cy.get('.confirm').click()
    cy.contains(noteTitle).should('not.exist')
  })

  it('shows save button when note content is edited', () => {
    const noteTitle = generateRandomString()
    const noteContent = generateRandomString()
    cy.get('[data-test-id="add-note"]').click()
    cy.get('[data-test-id="add-note-title-input"]').type(noteTitle)
    cy.get(
      '[data-placeholder="Start writing your note here"] p'
    ).type(noteContent, { force: true })
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.get(`.single-note:contains(${noteTitle})`).click()
    cy.get('.ql-editor').type('random content', { force: true })
    cy.contains('Save changes')
  })

  it('fails to create note with no title', () => {
    cy.get('[data-test-id="add-note"]').click()
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains('You need to insert a title')
  })
})
