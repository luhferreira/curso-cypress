/// <reference types="Cypress" />

describe('Central de atendimento ao cliente TAT', function(){
  beforeEach(function(){
   cy.visit('./src/index.html') //para visitar o site
  })
  //Primeiro teste: verifica o título
 it('verifica o título da aplicação', function (){
   cy.title().should('be.equal', 'Central de atendimento ao cliente TAT') 
 }) 
//Segundo teste: preencher os campos e visualizar a mensagem de sucesso
  it('Preenche os campos obrigatórios e envia o formulário', function (){
    const longText='Teste, teste, teste,teste, teste,tteste, teste,.'este, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,
    cy.get('#firstName').type('Luana')
    cy.get('#lastName').type('Ferreira')
    cy.get('#email').type('luhferreira@exemplo.com')
    cy.get('#open-tex-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.sucess').should('be.visible')
  })
//Terceiro teste: verificar erro enviando um formato inválido
  it('exibe mensagem de erro ao submeter o formulário com formatação inválida', function(){
    cy.get('#firstName').type('Luana')
    cy.get('#lastName').type('Ferreira')
    cy.get('#email').type('luhferreira@exemplo,com')
    cy.get('#open-tex-area').type('Test')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
//Quarto teste: invalidar o campo telefone em tentativas de preenchimentos não-numéricos
  it ('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
    cy.get('#phone').type('abcdefghij').should('have.value', '')
  })
  //Quinto teste: marcar o checkbox de telefone e não preencher, verificar erro 
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type('Luana')
    cy.get('#lastName').type('Ferreira')
    cy.get('#email').type('luhferreira@exemplo.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-tex-area').type('Test')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
//Sexto teste: preencher e limpar cada campo
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
      .type('Luana')
      .should('have.value', 'Luana')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Ferreira')
      .should('have.value', 'Ferreira')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('luhferreira@exemplo.com')
      .should('have.value', 'luhferreira@exemplo.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('85987390689')
      .should('have.value', '85987390689')
      .clear()
      .should('have.value', '')
    
  })
//Sétimo teste: verificar erro ao não preencher campos obrigratórios
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    
  })
//Oitavo teste: escrever comando customizado no arquivo commands.js e chamar o comando aqui
  it('envia o formulário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()
    
    cy.get('.sucess').should('be.visible')
  })
})










