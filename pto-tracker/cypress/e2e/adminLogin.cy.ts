import { url } from "inspector"

describe('User logs in with admin credentials', () => {
    it('successfully loads', () => {
        // loads our local dev server
        cy.visit('/')

        // Tests email input
        cy.get('#username').should('have.value', '')
        cy.get('#username').type('donkey@email.com')

        // Tests password input
        cy.get('#password').should('have.value', '')
        cy.get('#password').type('mario')

        // Logs in as admin
        cy.get('#loginButton').click()

        cy.get('.AdminSelection').should('contain', 'Please select an option')

        cy.get('#EditRadioButton').click()
        cy.get('.adminEditUser').should('contain', 'Edit Account')

        cy.get('#searchBar').type('1')
        cy.get('#userSearchBtn').click()

        
        // Add the code to navigate to the page and/or perform the search here
        
        // Now check each input field for the correct value
        cy.get('#username').should('have.value', '1');
        cy.get('#firstName').should('have.value', 'Rob');
        cy.get('#lastName').should('have.value', 'Stark');
        cy.get('#email').should('have.value', 'trackerpto@gmail.com');
        cy.get('#PhoneNumber').should('have.value', '5551234');
        // For password fields, if you actually know the value and it is rendered in the DOM, you can check them as well
        cy.get('#password').should('have.value', 'test');
        cy.get('#repeatPassword').should('have.value', 'test');
        cy.get('#LineManagerInput').should('have.value', '1278654');
        cy.get('#numberOfHolidays').should('have.value', '25');
        // For radio buttons, check if the correct one is checked
        cy.get('#createLineManager').should('not.be.checked');
        cy.get('#createAdmin').should('not.be.checked');
        
        // Do we need to then add a test for actually modifying the backend?
        cy.intercept('POST', 'http://localhost:5000/api/secured/editUser', {
        statusCode: 200,
        body: {
            "success: entire account edited":true
        },
        }).as('editUser');

        cy.get('.registerbtn').click();

        cy.wait('@editUser').its('response.statusCode').should('eq', 200);


        
    })
})