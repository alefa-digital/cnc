
var sqlite3 = require('sqlite3').verbose();

// Emplacement et nom du fichier de base de données
var db = new sqlite3.Database('./db/client.db');

// Création de la table clients
db.run('CREATE TABLE IF NOT EXISTS clients(prenom text, nom text)');

// Liste des clients
var listeClient = [['Pierre', 'DUPONT'], ['Paul', 'DUPOND'], ['Jacques', 'DURAND']];
 
// Construction des champs VALUES de la requête SQL
var placeholders = listeClient.map((client) => '(?)').join(',');
var sql = 'INSERT INTO clients(prenom, nom) VALUES ' + placeholders;
 
// Affichage dans la console de la requête
console.log(sql);
 
// Exécution de la requête
db.run(sql, listeClient, function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Nombre de ligne ajoutée ${this.changes}`);
});
 

var sql =  "SELECT * FROM clients ORDER BY prenom";
 
db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.prenom );
  });
});


// Fermeture de la connexion
db.close();
