import signup from '../pages/SignupPage'
import signinFactory from '../factories/SigninFactory'

describe('Sign up', () => {

    // beforeEach(function () {
    //     cy.fixture('deliveryGuy').then((d) => {
    //         this.deliveryGuy = d;
    //     })
    // })

    it('User must apply to be a delivery guy', function () {
        
        let deliveryGuy = signinFactory.deliveryGuy();

        signup.go();
        signup.fillForm(deliveryGuy);
        signup.submit();

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.';
        signup.modalContentShouldBe(expectedMessage);
    })

    it('Incorrect CPF', function () {

        let deliveryGuy = signinFactory.deliveryGuy();

        deliveryGuy.cpf = '10210236589aa';

        signup.go();
        signup.fillForm(deliveryGuy);
        signup.submit();
        signup.alertMessageShouldBe('Oops! CPF inválido');
    })

    it('Incorrect e-mail', function () {
        
        let deliveryGuy = signinFactory.deliveryGuy();

        deliveryGuy.email = 'mar-soares.com.br';

        signup.go();
        signup.fillForm(deliveryGuy);
        signup.submit();
        signup.alertMessageShouldBe('Oops! Email com formato inválido.');
    })

    context('Required fields', function () {

        const messages = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o email'},
            {field: 'postalcode', output: 'É necessário informar o CEP'},
            {field: 'number', output: 'É necessário informar o número do endereço'},
            {field: 'delivery_method', output: 'Selecione o método de entrega'},
            {field: 'CNH', output: 'Adicione uma foto da sua CNH'}
        ]

        before(function () {
            signup.go();
            signup.submit();
        })

        messages.forEach(function (msg) {
            it(`${msg.field} is required`, function () {
                signup.alertMessageShouldBe(msg.output);    
            })
        })
    })
})