/// <reference types="cypress" />

const authData = require('../fixtures/AUTH.json')
const postData = require('../fixtures/POST.json')
const putData = require('../fixtures/PUT.json')

describe('Update a booking from the API', () => {

    var token = '' // Armazena o token na variável
    var bookingId = '' // Armazena o bookingId na variável

    before('Login', () => {
        cy.getAuthToken(authData)
            .then((response) => {
                token = response.body.token
                // valida o status code e se o token existe no body da resposta
                expect(response.status).to.eq(200)
                expect(response.body.token).to.exist
            })
    })

    beforeEach('Create Booking', () => {
        cy.postCreateBooking(postData, token)
            .then((response) => {
                bookingId = response.body.bookingid
                // valida o status code e exibe o body da resposta
                expect(response.status).to.eq(200)
                cy.log('Booking ID criado: ' + bookingId)
                cy.log(JSON.stringify(response.body))

            })
    })

    it('Update Booking', () => {
        cy.updateBooking(putData, token, bookingId)
            .then((response) => {
                // valida o status code
                expect(response.status).to.eq(200)
                // valida se os dados foram atualizados corretamente
                cy.log(JSON.stringify(response.body))
                expect(response.body).to.have.property('firstname', putData.firstname)
                expect(response.body).to.have.property('lastname', putData.lastname)
                expect(response.body).to.have.property('totalprice', putData.totalprice)
                expect(response.body).to.have.property('depositpaid', putData.depositpaid)
                expect(response.body).to.have.property('bookingdates').that.deep.equals(putData.bookingdates)
                expect(response.body).to.have.property('additionalneeds', putData.additionalneeds)
            })
    })


    it('Update Booking without token', () => {

        const emptyToken = '' // Armazena o token vazio na variável

        cy.updateBooking(putData, emptyToken, bookingId)
            .then((response) => {
                // valida o status code
                expect(response.status).to.eq(403)
            })
    })

    it('Update Booking with invalid token', () => {

        const invalidToken = '23' // Armazena o token inválido na variável

        cy.updateBooking(putData, invalidToken, bookingId)
            .then((response) => {
                // valida o status code
                expect(response.status).to.eq(403)
            })
    })

})

