/// <reference types="cypress" />

const authData = require('../fixtures/AUTH.json')
const postData = require('../fixtures/POST.json')

describe('Deletes a booking from the API', () => {

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

    it('Delete Booking', () => {

        cy.deleteBooking(token, bookingId)
            .then((response) => {
                // valida o status code e se a reserva foi deletada
                expect(response.status).to.eq(201)
                cy.log('Booking ID deletado: ' + bookingId)
                cy.log(JSON.stringify(response.body))
            })
    })

    it('Delete Booking without id', () => {

        const emptyId = '' // Armazena o id vazio na variável

        cy.deleteBooking(token, emptyId)
            .then((response) => {
                // valida se o status code é 404
                expect(response.status).to.eq(404)
            })
    })

    it('Delete Booking with invalid id', () => {

        const invalidId = '999999' // Armazena o id inválido na variável

        cy.deleteBooking(token, invalidId)
            .then((response) => {
                // valida se o status code é 405, 404, 403 ou 400
                expect(response.status).to.be.oneOf([405,404, 403, 400])
            })
    })
})
