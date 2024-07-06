export const saveCookies = (stockName) => {
    cy.getCookies().then((cookies) => {
        cy.writeFile(`cypress/cookies/${stockName}.json`, cookies);
    });
};

export const loadCookies = (stockName, domain) => {
    cy.readFile(`cypress/cookies/${stockName}.json`).then((cookies) => {
        cy.visit(domain).then(() => {
            cookies.forEach((cookie) => {
                cy.setCookie(cookie.name, cookie.value, {
                    domain: cookie.domain,
                    path: cookie.path,
                    secure: cookie.secure,
                    httpOnly: cookie.httpOnly,
                    expiry: cookie.expiry,
                });
            });
            cy.reload();
        });
    });
};

