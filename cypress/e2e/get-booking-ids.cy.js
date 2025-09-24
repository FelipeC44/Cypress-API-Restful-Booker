/// <reference types="cypress" />

describe('Get a booking from the API', () => {
    before(() => {
        // Inicializa o should do chai
        chai.should()
    })

    it('Get all Bookings using then and expect', () => {
        cy.getBookingIds()
            .then((response) => {
                // valida o status code
                expect(response.status).to.eq(200)
                // valida se o body é um array e não está vazio
                expect(response.body).to.be.an('array').that.is.not.empty
                // cria um array com os ids das reservas a partir da variável
                const ids = response.body.map(b => b.bookingid)
                // exibe os ids no log e converte para string dentro da variável
                cy.log('IDs retornados: ' + JSON.stringify(ids))
                // valida se cada array possui a propriedade 'bookingid'
                response.body.forEach((booking) => {
                    expect(booking).to.have.property('bookingid')
                })
            })
    })

    it('Get all Bookings using then and should', () => {
        cy.getBookingIds()
            .then((response) => {
                // valida o status code
                response.should.have.property('status', 200)
                // valida se o body é um array não vazio
                response.body.should.be.an('array').that.is.not.empty
                // valida se cada objeto do array possui a propriedade 'bookingid'
                response.body.forEach((booking) => {
                    booking.should.have.property('bookingid')
                })
                // cria um array com os ids das reservas e exibe no log
                const ids = response.body.map(b => b.bookingid)
                cy.log('IDs: ' + JSON.stringify(ids))
            })
    })
})
