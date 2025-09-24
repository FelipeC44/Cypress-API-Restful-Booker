/// <reference types="cypress" />

describe('Get a booking from the API', () => {

    it('Get Booking by ID', () => {
        
        const bookingId = 1 // Armazena um ID de reserva que existe
        
        cy.getBooking(bookingId)
            .then((response) => {
                // valida o status code e exibe o body da resposta
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            })
    })

    it('Get all Bookings using failOnStatusCode', () => {

        const bookingId = 44444 // Armazena um ID de reserva que não existe

        cy.getBooking(bookingId)
            .then((response) => {
                // valida se o status code é 404 ou 400
                expect(response.status).to.be.oneOf([404, 400])
            })
    })
})