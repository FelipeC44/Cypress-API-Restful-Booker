
// Cria um novo token de autenticação (POST)
Cypress.Commands.add('getAuthToken', (bodyAuth) => {
    cy.request({
        method: 'POST',
        url: '/auth',
        failOnStatusCode: false, // desabilita o fail para status code fora da faixa 2xx e 3xx
        body: bodyAuth
    })
})



// Cria uma nova reserva (POST)
Cypress.Commands.add('postCreateBooking', (body, token) => {
    cy.request({
        method: 'POST',
        url: '/booking',
        failOnStatusCode: false, // desabilita o fail para status code fora da faixa 2xx e 3xx
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': token ? `token=${token}` : undefined // Inclui o token apenas se fornecido
        },
        body: body
    })
})


// Verifica todas as reservas (GET)
Cypress.Commands.add('getBookingIds', () => {
    cy.request({
        method: 'GET',
        url: '/booking',
        failOnStatusCode: false // desabilita o fail para status code fora da faixa 2xx e 3xx
    })
})



// Verifica uma reserva específica (GET)
Cypress.Commands.add('getBooking', (bookingId) => {
    cy.request({
        method: 'GET',
        url: `/booking/${bookingId}`,
        failOnStatusCode: false // desabilita o fail para status code fora da faixa 2xx e 3xx
    })
})


// Atualiza uma reserva específica (PUT)
Cypress.Commands.add('updateBooking', (putBody, token, bookingId) => {
    cy.request({
        method: 'PUT',
        url: '/booking/' + bookingId,
        failOnStatusCode: false, // desabilita o fail para status code fora da faixa 2xx e 3xx
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': token ? `token=${token}` : undefined // Inclui o token apenas se fornecido
        },
        body: putBody
    })
})


// Deleta uma reserva específica (DELETE)
Cypress.Commands.add('deleteBooking', (token, bookingId) => {
    cy.request({
        method: 'DELETE',
        url: '/booking/' + bookingId,
        failOnStatusCode: false, // desabilita o fail para status code fora da faixa 2xx e 3xx
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': token ? `token=${token}` : undefined // Inclui o token apenas se fornecido
        }
    })

})

