const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');




// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload_images'); // Dossier de destination
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renommer le fichier avec un timestamp
    }
});

const upload = multer({ storage: storage });

// Ajoutez ceci avant de définir vos routes
app.use(cors());




// Point de terminaison pour le téléchargement
app.post('/upload', upload.array('images'), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('Aucun fichier téléchargé.');
    }
    const fileNames = req.files.map(file => file.originalname).join(', ');
    res.send('Fichiers téléchargés avec succès : ' + fileNames);
});


// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});