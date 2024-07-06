const shutterStockConfig = Cypress.env('stocks').shutterstock;
import {loadCookies, saveCookies} from '../cookies';


export const loginToShutterstock = (email = shutterStockConfig.creds.email, password = shutterStockConfig.creds.password) => {
    loadCookies(shutterStockConfig.name, shutterStockConfig.baseUrl)
    cy.visit(Cypress.env('stocks').shutterstock.baseUrl);

    cy.get('input[data-test-id="email-input"]').type(email);
    cy.get('input[data-test-id="password-input"]').type(password, {log: false});

    cy.get('button[data-test-id="login-form-submit-button"]').click();

    cy.url().should('include', 'shutterstock.com');
    cy.get('[data-testid="desktop-upload-button"]').should('exist');
    saveCookies(shutterStockConfig.name);
};
