Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    const longtext = 'Neste sentido, a contínua expansão de nossa atividade deve passar por modificações independentemente das diretrizes de desenvolvimento para o futuro.'

    cy.get('#firstName').type('Maydson')
    cy.get('#lastName').type('Ribeiro')
    cy.get('#email').type('maydson@teste.com')
    cy.get('#open-text-area').type(longtext, { delay: 0 })
    cy.contains('button','Enviar').click()

})
