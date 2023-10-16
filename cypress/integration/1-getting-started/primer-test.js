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

  it("seleciona um produto (YouTube) por seu texto", function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it(" marca o tipo de atendimento feedback ", function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get("input[type='radio'][value='feedback']")
      .check()
      .should("be.checked");
  });

  it("marca cada tipo de atendimento ", function () {
    cy.get("input[type='radio']")
      .should("have.length", 3)
      .each(function ($radio) {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });

  it("marca ambos checkboxes, depois desmarca o último ", function () {
    cy.get('#check input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("marca ambos checkboxes, depois desmarca o último ", function () {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json")
      .then((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });
  it("seleciona um arquivo da pasta fixtures", function () {
    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json")
      .then((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", function () {
    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("  seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function () {
    cy.fixture("example.json", { encoding: "null" }).as("exampleFile");

    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile({
        contents: "@exampleFile",
        fileName: "example.json",
        alias: "exampleFile",
      })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function () {
    cy.get("a").should("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", function () {
    cy.get("a").invoke("removeAttr", "target").click();
  });

  it("testa a página da política de privacidade de forma independente", function () {
    cy.get("a").invoke("removeAttr", "target").click();
    cy.get("#title").should("have.text", "CAC TAT - Política de privacidade");
  });
});
