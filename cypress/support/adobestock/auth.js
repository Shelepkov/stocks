const adobeStockConfig = Cypress.env('stocks').adobestock;
import { saveCookies } from '../cookies';


export const loginToAdobeStock = (email = adobeStockConfig.creds.email, password = adobeStockConfig.creds.password) => {
    cy.visit(adobeStockConfig.baseUrl);
    cy.get('[data-t="navbar-sign-in-button"]').click();
    cy.get('input[name="username"]').type(adobeStockConfig.creds.email);
    cy.get('button[data-id="EmailPage-ContinueButton"]').click();
    cy.get('input[data-id="PasswordPage-PasswordField"]').type(adobeStockConfig.creds.password);
    cy.get('button[data-id="PasswordPage-ContinueButton"]').click();
};
