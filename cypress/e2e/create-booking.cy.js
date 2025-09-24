/// <reference types="cypress" />

const postData = require('../fixtures/POST.json')

describe('Creates a new booking in the API', () => {

    it('Create Booking', () => {
        cy.postCreateBooking(postData)
            .then((response) => {
                // valida o status code, o body da resposta e exibe o id criado
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('bookingid')
                cy.log('Booking ID:', response.body.bookingid)
            })
    })

})