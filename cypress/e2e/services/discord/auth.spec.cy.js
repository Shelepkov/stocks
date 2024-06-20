describe('Discord Login Test', () => {
    it('Log in to Discord', () => {
        const discordConfig = Cypress.env('discord');
        console.log('discordConfig',discordConfig)
        cy.visit(`${discordConfig.baseUrl}/login`);
        cy.get('input[name="email"]').type(discordConfig.creds.email);
        cy.get('input[name="password"]').type(discordConfig.creds.password, { log: false });

        cy.get('button[type="submit"]').click();
        cy.url({ timeout: 10000 }).should('include', '/channels/@me');
        cy.visit(`${discordConfig.baseUrl}/channels/@me`);

        cy.getCookies().then((cookies) => {
            cy.writeFile('cypress/cookies.json', cookies);
        });
    });
});
