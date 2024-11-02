const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Dossier pour les tests E2E
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}', // Modifiez ce chemin selon votre structure de projet
    baseUrl: 'http://localhost:3001', // Modifiez l'URL selon votre besoin
  }
});
