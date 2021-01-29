/* eslint-disable no-undef */
import { generateRandomString } from '../../src/utils/globalHelpers'

describe('Notes', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-test-id="signin-email"]').type('cypress@teste.pt')

    cy.get('[data-test-id="signin-pw"]').type('123456')

    cy.contains('Login').click()
    cy.contains('Notes')
    cy.visit('http://localhost:3000/notes')
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

  it('creates a note & displays on view', () => {
    const noteTitle = generateRandomString()
    const noteContent = generateRandomString()
    cy.get('[data-test-id="add-note"]').click()
    cy.get('[data-test-id="add-note-title-input"]').type(noteTitle)
    cy.get('[data-placeholder="Start writing your note here"] p').type(
      noteContent
    )
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains(noteTitle)
  })

  it('fails to create note with no title', () => {
    cy.get('[data-test-id="add-note"]').click()
    cy.get('[data-test-id="submit-btn"]').click({ force: true })
    cy.contains('You need to insert a title')
  })
})
