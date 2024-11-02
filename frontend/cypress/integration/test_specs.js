// cypress/integration/test_spec.js
describe('Morning-News-integration', () => {
    it('devrait afficher la page d\'accueil', () => {
      cy.visit('http://127.0.0.1:3001');  // Visite la racine de l'application
      cy.contains('ARTICLES');  // Remplacez par du texte présent sur votre page
    });
  });
  