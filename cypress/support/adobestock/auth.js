const adobeStockConfig = Cypress.env('stocks').adobestock;
import {saveCookies, loadCookies} from '../cookies';


export const loginToAdobeStock = (email = adobeStockConfig.creds.email, password = adobeStockConfig.creds.password) => {
    // loadCookies(adobeStockConfig.name, adobeStockConfig.baseUrl)
    // cy.visit(adobeStockConfig.baseUrl);
    // cy.get('[data-t="navbar-sign-in-button"]').click();
    // cy.get('input[name="username"]').type(adobeStockConfig.creds.email);
    // cy.get('button[data-id="EmailPage-ContinueButton"]').click();
    // cy.pause();
    // cy.get('input[data-id="PasswordPage-PasswordField"]').type(adobeStockConfig.creds.password);
    // cy.get('button[data-id="PasswordPage-ContinueButton"]').click();
    // saveCookies(adobeStockConfig.name);
};
