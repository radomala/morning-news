// importArticles.js
//const importerArticles = () => {
    // logique d'importation des articles
//};

//module.exports = importerArticles;

//const url = "https://newsapi.org/v2/everything?domains=wsj.com"





const fetch = require('node-fetch'); // Assurez-vous que node-fetch est installé
const mongoose = require('mongoose'); // Si vous utilisez Mongoose pour interagir avec MongoDB
const Article = require('./models/articles.js'); // Remplacez par le chemin de votre modèle d'article

const importerArticles = async () => {
    const url = "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=" + process.env.NEW_API_KEY;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Assurez-vous que votre réponse contient des articles
        if (data.articles && data.articles.length > 0) {
            await Article.insertMany(data.articles); // Remplacez par le modèle approprié
            console.log('Articles importés avec succès.');
        } else {
            console.log('Aucun article trouvé.');
        }
    } catch (error) {
        console.error('Erreur lors de l\'importation des articles:', error);
    }
};

module.exports = importerArticles;
