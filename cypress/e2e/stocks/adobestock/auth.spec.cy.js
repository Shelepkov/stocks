describe('Adobe Stock Login Test', () => {
    it('Log in to Adobe Stock', () => {
        const adobeStockConfig = Cypress.env('stocks').adobestock;
        console.log('adobeStockConfig', adobeStockConfig);
        cy.visit(adobeStockConfig.baseUrl);
        cy.get('[data-t="navbar-sign-in-button"]').click();
        cy.get('input[name="username"]').type(adobeStockConfig.creds.email);
        cy.get('button[data-id="EmailPage-ContinueButton"]').click();
        cy.get('input[data-id="PasswordPage-PasswordField"]').type(adobeStockConfig.creds.password);
        cy.get('button[data-id="PasswordPage-ContinueButton"]').click();
    });
});
