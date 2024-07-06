describe('Discord Login Test', () => {
    it('Log in to Discord', () => {
        const discordConfig = Cypress.env('discord');
        console.log('discordConfig', discordConfig);

        // Step 1: Visit the Discord login page
        cy.visit(`${discordConfig.baseUrl}/login`);

        // Step 2: Fill in the login form
        cy.get('input[name="email"]').type(discordConfig.creds.email);
        cy.get('input[name="password"]').type(discordConfig.creds.password, { log: false });

        // Step 3: Submit the login form
        cy.get('button[type="submit"]').click();


        // Step 5: Wait for the redirection to the main page
        cy.url({ timeout: 20000 }).should('include', '/channels/@me');

        // Step 6: Verify that the user is logged in
        cy.get('[data-testid="guildsnav"]').should('exist');

        // Optionally, save cookies for future use
        cy.getCookies().then((cookies) => {
            cy.writeFile('cypress/cookies.json', cookies);
        });
    });
});
