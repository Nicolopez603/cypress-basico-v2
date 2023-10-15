/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("Validate the title of the app", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("Complete the fields required", function () {
    const textLarge =
      "Test, test, test, test, test, test, test, test, test,Test, test, test, test, test, test, test, test, test,Test, test, test, test, test, test, test, test, test";
    cy.get("#firstName")
      .click()
      .type("Nicolas")
      .should("have.value", "Nicolas");
    cy.get("#lastName").click().type("Lopez").should("have.value", "Lopez");
    cy.get("#email")
      .click()
      .type("nicomlopez3@gmail.com")
      .should("have.value", "nicomlopez3@gmail.com");
    cy.get("#open-text-area")
      .click()
      .type(textLarge, { delay: 0 })
      .should(
        "have.value",
        "Test, test, test, test, test, test, test, test, test,Test, test, test, test, test, test, test, test, test,Test, test, test, test, test, test, test, test, test"
      );

    cy.get("button[type='submit']").click();
    cy.get(".success").should("be.visible");
  });
  it("Validate the message error", function () {
    const textLarge =
      "Test, test, test, test, test, test, test, test, test,Test, test, test, test, test, test, test, test, test,Test, test, test, test, test, test, test, test, test";

    cy.get("#firstName")
      .click()
      .type("Nicolas")
      .should("have.value", "Nicolas");
    cy.get("#lastName").click().type("Lopez").should("have.value", "Lopez");
    cy.get("#email")
      .click()
      .type("nicomlopez3@gmail,com")
      .should("have.value", "nicomlopez3@gmail,com");
    cy.get("#open-text-area")
      .click()
      .type(textLarge, { delay: 0 })
      .should(
        "have.value",
        "Test, test, test, test, test, test, test, test, test,Test, test, test, test, test, test, test, test, test,Test, test, test, test, test, test, test, test, test"
      );
    cy.get("button[type='submit']").click();
    cy.get(".error").should("be.visible");
  });

  it("Validate the field number don't have text", function () {
    cy.get("#phone").type("asdasd").should("have.value", "");
  });
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    const textLarge =
      "Test, test, test, test, test, test, test, test, test,Test, test, test, test, test, test, test, test, test,Test, test, test, test, test, test, test, test, test";

    cy.get("#firstName")
      .click()
      .type("Nicolas")
      .should("have.value", "Nicolas");
    cy.get("#lastName").click().type("Lopez").should("have.value", "Lopez");
    cy.get("#phone-checkbox").check();
    cy.get("#email")
      .click()
      .type("nicomlopez3@gmail,com")
      .should("have.value", "nicomlopez3@gmail,com");
    cy.get("#open-text-area")
      .click()
      .type(textLarge, { delay: 0 })
      .should(
        "have.value",
        "Test, test, test, test, test, test, test, test, test,Test, test, test, test, test, test, test, test, test,Test, test, test, test, test, test, test, test, test"
      );
    cy.get("button[type='submit']").click();
    cy.get(".error").should("be.visible");
  });
  it("Validate the field number don't have text", function () {
    cy.get("#phone").type("asdasd").should("have.value", "");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    const textLarge =
      "Test, test, test, test, test, test, test, test, test,Test, test, test, test, test, test, test, test, test,Test, test, test, test, test, test, test, test, test";

    cy.get("#firstName")
      .click()
      .type("Nicolas")
      .clear()
      .should("have.value", "");
    cy.get("#lastName").click().type("Lopez").clear().should("have.value", "");
    cy.get("#phone-checkbox").check();
    cy.get("#email")
      .click()
      .type("nicomlopez3@gmail,com")
      .clear()
      .should("have.value", "");
    cy.get("#open-text-area")
      .click()
      .type(textLarge, { delay: 0 })
      .clear()
      .should("have.value", "");
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });
});
