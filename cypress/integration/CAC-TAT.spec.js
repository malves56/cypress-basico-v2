/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
const THREE_SECONDS_IN_MS = 3000

    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longtext = 'Neste sentido, a contínua expansão de nossa atividade deve passar por modificações independentemente das diretrizes de desenvolvimento para o futuro.'
        
        cy.clock()

        cy.get('#firstName').type('Maydson')
        cy.get('#lastName').type('Ribeiro')
        cy.get('#email').type('maydson.alves@yahoo.com')
        cy.get('#open-text-area').type(longtext, { delay: 0 })
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        const longtext = 'Neste sentido, a contínua expansão de nossa atividade deve passar por modificações independentemente das diretrizes de desenvolvimento para o futuro.'
        
        cy.clock()

        cy.get('#firstName').type('Maydson')
        cy.get('#lastName').type('Ribeiro')
        cy.get('#email').type('maydson.alves')
        cy.get('#open-text-area').type(longtext, { delay: 0 })
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('preenche campo telefone com valor não numerico', function() {
        const longtext = 'Neste sentido, a contínua expansão de nossa atividade deve passar por modificações independentemente das diretrizes de desenvolvimento para o futuro.'
        
        cy.get('#firstName').type('Maydson')
        cy.get('#lastName').type('Ribeiro')
        cy.get('#email').type('maydson.alves')
        cy.get('#phone').type('TESTE TELEFONE')
        cy.get('#phone').should('be.empty')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        const longtext = 'Neste sentido, a contínua expansão de nossa atividade deve passar por modificações independentemente das diretrizes de desenvolvimento para o futuro.'

        cy.clock()

        cy.get('#phone-checkbox').click()

        cy.get('#firstName').type('Maydson')
        cy.get('#lastName').type('Ribeiro')
        cy.get('#email').type('maydson.alves')
        cy.get('#open-text-area').type(longtext, { delay: 0 })
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone',function() {
        const longtext = 'Neste sentido, a contínua expansão de nossa atividade deve passar por modificações independentemente das diretrizes de desenvolvimento para o futuro.'

        cy.get('#phone-checkbox').click()

        cy.get('#firstName').type('Maydson').should('have.value','Maydson')
        cy.get('#lastName').type('Ribeiro').should('have.value','Ribeiro')
        cy.get('#email').type('maydson.alves').should('have.value','maydson.alves')
        cy.get('#open-text-area').type(longtext, { delay: 0 }).should('have.value',longtext)
        
        cy.get('#firstName').clear().should('have.value','')
        cy.get('#lastName').clear().should('have.value','')
        cy.get('#email').clear().should('have.value','')
        cy.get('#open-text-area').clear().should('have.value','')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.clock()

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('Exercicio 08', function() {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value','youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value','mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value','blog')        
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        //cy.get('[type="radio"]').check('feedback').should('have.value', 'feedback')
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .should('be.checked')
            .uncheck()
            .should('not.be.checked')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.clock()
        cy.get('input[type="checkbox"]')
            .last()
            .check()
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                console.log($input)
                expect($input[0].files[0].name)
                .to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function($input) {
                console.log($input)
                expect($input[0].files[0].name)
                .to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')

        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                console.log($input)
                expect($input[0].files[0].name)
                .to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
            
        cy.contains('Talking About Testing'). should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

    it('preenche área de texto utilizando o .invoke', function(){
        const longtext = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
            .invoke('val', longtext)
            .should('have.value', longtext)
    })

    it('faz uma requisição HTTP', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response){
                const  {status, statusText, body } = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    })

    it('encontra o gato escondido', function(){
        cy.get('#cat')
          .invoke('show')
          .should('be.visible')
        cy.get('#title')
          .invoke('text', 'CAT TAT')
    })

})