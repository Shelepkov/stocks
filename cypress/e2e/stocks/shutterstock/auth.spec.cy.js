describe('Adobe Stock Login Test', () => {
    it('Log in to Adobe Stock', () => {
        const shutterStockConfig = Cypress.env('stocks').shutterstock;

        console.log('shutterStockConfig', shutterStockConfig);
        cy.visit(`${shutterStockConfig.baseURL}/login`);

        cy.pause();


        cy.get('[data-t="navbar-sign-in-button"]').click();
        cy.get('input[name="username"]').type(shutterStockConfig.creds.email);
        cy.get('button[data-id="EmailPage-ContinueButton"]').click();
        cy.pause();
        cy.get('input[data-id="PasswordPage-PasswordField"]').type(shutterStockConfig.creds.password);
        cy.get('button[data-id="PasswordPage-ContinueButton"]').click();



        cy.url().should('include', 'stock.adobe.com');
        cy.contains('Your Account').should('be.visible');
    });
});
