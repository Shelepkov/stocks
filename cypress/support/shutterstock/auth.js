const shutterStockConfig = Cypress.env('stocks').shutterstock;
import { saveCookies } from '../cookies';


export const loginToShutterstock = (email = shutterStockConfig.creds.email, password = shutterStockConfig.creds.password) => {
    cy.visit(Cypress.env('stocks').shutterstock.baseUrl);

    cy.get('input[data-test-id="email-input"]').type(email);
    cy.get('input[data-test-id="password-input"]').type(password, {log: false});

    cy.get('button[data-test-id="login-form-submit-button"]').click();

    cy.url().should('include', 'shutterstock.com');
    cy.contains('My Account').should('be.visible');
    cy.getCookies().then((cookies) => {
        cy.writeFile(`cypress/cookies/${stockName}.json`, cookies);
    });
    // saveCookies(shutterstock.name);
};
