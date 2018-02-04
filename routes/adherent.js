const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/cnc';

// Configuration des accès à la BDD
const config = {
    user: 'demo',
    database: 'cnc',
    password: 'demo',
    port: 5432
};

// Création d'un objet avec les paramètres de connexion
const pool = new pg.Pool(config);

/* GET adhérent : Liste des adhérent */
router.get('/v1/adherent', (req, res, next) => {
  const results = [];
  // Connexion à la BDD
   pool.connect( (err, client, done) => {
    // Si il y a une erreur
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    client.query('SELECT "NUMADHER" as id, \
				"NOM1" as nom, \
				"DEP" as departement, \
				b."LIBELLE_INDUSTRIE" as industrie,\
				"CORRES1" as correspondant,\
				"TEL1" as telephone,\
				"EMAIL" as email,\
				"SIRET" \
				FROM public.ADHERENTS as a \
				LEFT JOIN public.CORR_INDUSTRIE as b \
				ON a."CODE_INDUSTRIE" = b."CODE_INDUSTRIE"',
				function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
			else {
				// Envoi des données JSON au navigateur : Pour visualiser tester l'adresse http://localhost/api/v1/adherent
				res.send({ 'data' : result.rows});
			}
       })
  });
});

/* POST adhérent : Ajout d'un nouveau adhérent */
router.post('/v1/adherent', (req, res, next) => {
		
		// Connexion à la BDD
	    pool.connect( (err, client, done) => {
			// Si il y a une erreur
			if(err) {
				done();
				console.log(err);
				return res.status(500).json({success: false, data: err});
			}
			// Requete INSERT INTO pour ajouter l'adherent
		    client.query('INSERT into public.ADHERENTS \
						("NUMADHER", "NOM1", "NOM2", "ADR1", "ADR2", "CP", "VILLE", "DEP", "CODE_INDUSTRIE", "SIRET", "CIVIL1", "CIVIL2", "CORRES1", "CORRES2", "TEL1", "TEL2", "PANEL", "EMAIL", "EMAIL2", "FAX", "SITE_WEB", "COMMENTAIRE") \
						 VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)',
						 [
						 req.body.numAdherent, 
						 req.body.nom1, 
						 req.body.nom2 || null, 
						 req.body.adresse1, 
						 req.body.adresse2 || null, 
						 req.body.codePostal, 
						 req.body.ville, 
						 req.body.codePostal.substring(0,2), 
						 req.body.industrie, 
						 req.body.numSiret,
						 req.body.civilite1,
						 req.body.civilite2 || null,
						 req.body.correspondant1,
						 req.body.correspondant2 || null,
						 req.body.tel1,
						 req.body.tel1 || null,
						 req.body.panel,
						 req.body.email1 || null,
						 req.body.email2 || null,
						 req.body.fax || null,
						 req.body.site || null,
						 req.body.commentaire || null
						 ],
				function (err, result) {
					done();
					if (err) {
						// Envoi de l'erreur au navigateur
						console.log(err);
						res.status(400).send(err.detail);
					}
					else {
						// Requete correctement executée, retourne le numéro de l'adhérent
						res.send({success: true, data: req.body.numAdherent});
					}
				})
		});
});

/* PUT adhérent : Mise à jour d'un adhérent */
router.put('/v1/adherent', (req, res, next) => {
		res.status(200).send(true);
});

/* DELETE adhérent : Suppression d'un adhérent */
router.delete('/v1/adherent', (req, res, next) => {
		res.status(200).send(true);
});

module.exports = router;
