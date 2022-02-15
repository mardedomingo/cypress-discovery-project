

class SignupPage {

    go(){
        cy.visit('/');
        
        cy.get('a[href="/deliver"]').click();
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas');
    }

    fillForm(deliveryGuy) {
        cy.get('input[name="fullName"]').type(deliveryGuy.name);
        cy.get('input[name="cpf"]').type(deliveryGuy.cpf);
        cy.get('input[name="email"]').type(deliveryGuy.email);
        cy.get('input[name="whatsapp"]').type(deliveryGuy.whatsapp);

        cy.get('input[name="postalcode"]').type(deliveryGuy.address.postalcode);
        cy.get('input[type=button][value="Buscar CEP"]').click();

        cy.get('input[name="address"]').should('have.value', deliveryGuy.address.street);
        cy.get('input[name="district"]').should('have.value', deliveryGuy.address.district);
        cy.get('input[name="city-uf"]').should('have.value', deliveryGuy.address.city_state);

        cy.get('input[name="address-number"]').type(deliveryGuy.address.number);
        cy.get('input[name="address-details"]').type(deliveryGuy.address.complement);

        cy.contains('.delivery-method li', deliveryGuy.delivery_method).click();
        cy.get('input[accept^="image"]').attachFile('/images/' + deliveryGuy.cnh);
    }

    submit() {
        cy.get('form button[type="submit"]').click();
    }

    modalContentShouldBe(expectedMessage) {
        cy.get('.swal2-container .swal2-html-container')
            .should('have.text', expectedMessage);
    }

    alertMessageShouldBe(expectedMessage) {
        //cy.get('.alert-error').should('have.text', expectedMessage);
        cy.contains('.alert-error', expectedMessage).should('be.visible');
    }
}

export default new SignupPage;