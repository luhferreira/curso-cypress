Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
  cy.get('#firstName').type('Luana')
  cy.get('#lastName').type('Ferreira')
  cy.get('#email').type('luhferreira@exemplo.com')
  cy.get('#open-tex-area').type('Test')
  cy.get('button[type="submit"]').click()
})
