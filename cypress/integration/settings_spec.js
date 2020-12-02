/* eslint-disable no-undef */

describe('Settings', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-test-id="signin-email"]').type('cypress@teste.pt')

    cy.get('[data-test-id="signin-pw"]').type('123456')

    cy.contains('Login').click()
    cy.contains('what will you track')
    cy.visit('http://localhost:3000/settings')
    cy.contains('Settings')
  })

  it('Apply button works correctly', () => {
    cy.get('[data-test-id="change-profile-button"]').should('be.disabled')
    cy.get('[data-test-id="profile-name-input"]').type('asda')
    cy.get('[data-test-id="change-profile-button"]').should('not.be.disabled')
  })

  it('Confirm button works correctly', () => {
    cy.get('[data-test-id="change-password-button"]').should('be.disabled')
    cy.get('[data-test-id="profile-password-input"]').type('asda')
    cy.get('[data-test-id="profile-newpassword-input"]').type('asdasad')
    cy.get('[data-test-id="change-password-button"]').should('not.be.disabled')
  })

  it('fails if passwords dont match', () => {
    cy.get('[data-test-id="profile-password-input"]').type('23131')
    cy.get('[data-test-id="profile-newpassword-input"]').type('adsadad')
    cy.get('[data-test-id="change-password-button"]').click()
    cy.contains('Current password is incorrect')
  })

  it('fails if passwords are the same', () => {
    cy.get('[data-test-id="profile-password-input"]').type('123456')
    cy.get('[data-test-id="profile-newpassword-input"]').type('123456')
    cy.get('[data-test-id="change-password-button"]').click()
    cy.contains("New password can't be the same")
  })
})
