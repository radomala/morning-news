describe('Test end-to-end de la connexion au compte', () => {
    beforeEach(() => {
      // Visiter la page d'accueil avant chaque test
      cy.visit('http://127.0.0.1:3001'); // Remplacez par l'URL de votre page d'accueil
    });
  
    it('Devrait bookmark un article', () => {
      // Vérifiez que les articles sont affichés
      // cy.get('.articles').should('have.length.greaterThan', 0); // Assurez-vous qu'il y a des articles
      // Attendre 2 secondes
      cy.wait(2000); 

      // Cliquez sur l'icone "compte"
      cy.get('.svg-inline--fa.fa-user.Header_userSection__U8YyE') // Assurez-vous que ce sélecteur correspond à votre code
        .click();
        // Attendre 2 secondes
      cy.wait(2000); 
  
      // Cliquer sur Username
      cy.get('#signInUsername')
        .click()
        .type('alexis'); // Correctement enchaîné
      
        // Attendre 2 secondes
      cy.wait(2000); 

        //Cliquer sur Password
      cy.get('#signInPassword')
        .click()
        .type('alexis'); // Correctement enchaîné

    // Attendre 2 secondes
      cy.wait(2000); 

      //Cliquer sur "se connecter"  
      cy.get('#connection')
        .click()

      // Attendre 2 secondes
      cy.wait(2000); 
      
      // Vérifiez que "Welcome" est affiché sur la page
      cy.contains('Welcome').should('be.visible');
    });
  });
  