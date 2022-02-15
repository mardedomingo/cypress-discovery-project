let faker = require('faker')
let cpf = require('gerador-validador-cpf')

export default {

    deliveryGuy: function() {

        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();

        let data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '81998693211',
            address: {
                postalcode: '04534011',
                street: 'Rua Joaquim Floriano',
                number: '1000',
                complement: 'Flat 142',
                district: 'Itaim Bibi',
                city_state: 'São Paulo/SP'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        return data
    }
}