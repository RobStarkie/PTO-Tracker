describe('template spec', () => {
  it('passes', () => {
    // takes us to new url
    cy.visit('https://example.cypress.io')

    //checks there is a button 'type' and clicks it
    cy.contains('type').click()

    // test checks the url includes '/commands/actions' after clicking the link
    cy.url().should('include', '/commands/actions')

    // inputs a fake email into the DOM element '.action-email'
    cy.get('.action-email').type('fake@email.com')
    expect(true).to.equal(true)

    // Verify that the input has been input into the text box
    cy.get('.action-email').should('have.value', 'fake@email.com')
  })
})