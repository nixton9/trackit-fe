/* eslint-disable no-undef */
describe('Sign Up', () => {
  it('register fails with used email', () => {
    cy.visit('http://localhost:3000/signup')

    cy.get('[data-test-id="signup-name"]').type('John Doe')
    cy.get('[data-test-id="signup-email"]').type('edssda@gsdail.com')
    cy.get('[data-test-id="signup-pw"]').type('123456')

    cy.contains('Sign Up').click()

    cy.contains('There is already an account with this email address')
  })

  it('register fails with password with less than 6 chars', () => {
    cy.visit('http://localhost:3000/signup')

    cy.get('[data-test-id="signup-name"]').type('John Doe')
    cy.get('[data-test-id="signup-email"]').type('edssda@gssdadail.com')
    cy.get('[data-test-id="signup-pw"]').type('1234')

    cy.contains('Sign Up').click()

    cy.contains('Password needs to have at least 6 characters')
  })
})
