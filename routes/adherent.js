const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/cnc';

// Configuration des accès à la BDD
const config = {
    user: 'postgres',
    database: 'cnc',
    password: '',
    port: 5432
};

// Création d'un objet avec les paramètres de connexion
const pool = new pg.Pool(config);

/* GET adhérent : Liste des adhérent */
router.get('/v1/adherant', (req, res, next) => {
  const results = [];
  // Connexion à la BDD
   pool.connect( (err, client, done) => {
    // Si il y a une erreur
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    client.query('SELECT "NUMADHER" as id, "NOM1" as nom, "DEP" as departement, "REGION" as region, "CORRES1" as correspondant, "tel1" as telephone, "email" as email, "SIRET" FROM public.cnc', function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
			// Envoi des données JSON au navigateur : Pour visualiser tester l'adresse http://localhost/api/v1/adherent
            res.send({ 'data' : result.rows});
       })
  });
});

/* POST adhérent : Ajout d'un nouveau adhérent */
router.post('/v1/adherant', (req, res, next) => {
		// Envoi au navigateur les champs du formulaire
		res.status(200).send(req.body);
		// Faire une requete INSERT INTO
});

/* PUT adhérent : Mise à jour d'un adhérent */
router.put('/v1/adherant', (req, res, next) => {
		res.status(200).send(true);
});

/* DELETE adhérent : Suppression d'un adhérent */
router.delete('/v1/adherant', (req, res, next) => {
		res.status(200).send(true);
});

module.exports = router;
