const express = require('express');
const router = express.Router();
const fs   = require('fs');	
const util = require('util');
const stream = require('stream');
const pdf = require('html-pdf');
const jade = require('jade');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Conseil National du Cuir' });
});


/* GET Export XLSX */
router.get('/exportXLS', function(req, res, next) {
	const jade_export = jade.compileFile('./views/export.pug');
	res.set({
		'content-type': 'application/vnd.ms-excel; charset=utf8'
	});
	res.setHeader("Content-Disposition", "attachment; filename=ListeAdherent.xls");
    res.send("\uFEFF" + jade_export());
});

/* GET Export PDF */
router.get('/exportPDF', (req, res, next) => {
	const jade_export = jade.compileFile('./views/export.pug');
	const headerHTML = "<h1> CNC </h1>";
	
	const footerHTML = '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>';	
	const filename= "./ListeAdherent.pdf";
	const options = {
		filename: filename,
		format: 'A4',
		orientation: "landscape",
		border: {
			"top": "0",            // default is 0, units: mm, cm, in, px 
			"right": "1cm",
			"bottom": "0",
			"left": "1cm"
		},
	       
		header: {
		  "height": "20mm",
		  "contents": headerHTML
		},
		footer: {
		  "height": "10mm",
		  "contents": footerHTML
		}
	};	
	pdf.create(jade_export(), options).toFile((err) => {
		if (err) return next(err); 
		res.download(filename, (erreur) => {
				 if (erreur) return next(erreur);
		});	
	});
});

module.exports = router;
