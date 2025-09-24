/// <reference types="cypress" />

const authData = require('../fixtures/AUTH.json')

describe('Creates a new auth token', () => {

    it('Create Token', () => {
        cy.getAuthToken(authData)
            .then((response) => {
                // valida o status code e se o token existe
                expect(response.status).to.eq(200)
                expect(response.body.token).to.exist

            })
    })
})
