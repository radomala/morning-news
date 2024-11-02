const mongoose = require('mongoose');

// Définir le schéma de l'article
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },      // Titre de l'article
  author: { type: String, required: true },     // Auteur de l'article
  description: { type: String },                 // Description de l'article
  url: { type: String },                         // URL de l'article
  urlToImage: { type: String },                  // URL de l'image
  publishedAt: { type: Date },                   // Date de publication
  content: { type: String }                       // Contenu de l'article
});

// Créer le modèle d'article
const Article = mongoose.model('Article', articleSchema);

// Exporter le modèle pour l'utiliser ailleurs
module.exports = Article;
