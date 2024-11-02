// app.js

require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

console.log("MongoDB URI:", uri);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const importerArticles = require('./importArticles'); // Importer la fonction

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Appeler la fonction d'importation des articles
const maFonctionImport = async () => {
    try {
        await importerArticles(); // Appeler la fonction d'importation
        console.log('Articles importés avec succès.');
    } catch (error) {
        console.error('Erreur lors de l\'importation des articles :', error);
    }
};

// Appeler la fonction d'importation au démarrage du serveur
maFonctionImport();

module.exports = app;
