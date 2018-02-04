$(document).ready(function() {
	// Setup - add a text input to each footer cell
    $('#example tfoot th').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder="Rechercher '+title+'" />' );
    } );
	
	var language = {
	    "thousands": ".",
	    "decimal": ",",
	    "sProcessing":     "Traitement en cours...",
	    "sSearch":         "Rechercher&nbsp;:",
	    "sLengthMenu":     "Afficher _MENU_ adh&eacute;rents",
	    "sInfo":           "Affichage de l'adh&eacute;rent _START_ &agrave; _END_ sur _TOTAL_ adh&eacute;rents",
	    "sInfoEmpty":      "Affichage de l'adh&eacute;rent 0 &agrave; 0 sur 0 adh&eacute;rents",
	    "sInfoFiltered":   "(_MAX_ adh&eacute;rents au total)",
	    "sInfoPostFix":    "",
	    "sLoadingRecords": "Chargement en cours...",
	    "sZeroRecords":    "Aucun resultat pour cette recherche",
	    "sEmptyTable":     "Aucun &eacute;l&eacute;ment &agrave; afficher",
	    "oPaginate": {
		"sFirst":      "Premier",
		"sPrevious":   "Pr&eacute;c&eacute;dent",
		"sNext":       "Suivant",
		"sLast":       "Dernier"
	    },
	    "oAria": {
		"sSortAscending":  ": activer pour trier la colonne par ordre croissant",
		"sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
	    },
	    "bDeferRender": true
	    
    };
	
    var table = $('#example').DataTable( {
        "ajax": "/api/v1/adherent",
		"responsive": true,
		"language" : language,
		"lengthMenu": [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "Tous"]],
		"iDisplayLength": 10,
        "columns": [
            { "data": "id" },
            { "data": "nom" },
            { "data": "departement" },
            { "data": "industrie" },
            { "data": "correspondant" },
            { "data": "telephone" },
            { "data": "email" },
            { "data": "SIRET" },
            { "data": null,
				"render": function (data, type, row) {
					return "<a href='?idAdherent="+data["id"]+"'> " +
					"<img src='/images/modifier.png' style='text-align:center' height='20px' alt='Modifier' /></a>" +
					"<a href='?idAdherent="+data["id"]+"'> <img src='/images/corbeille.png' style='text-align:center' height='20px' alt='Supprimmer' /></a>";
			   }
			}
        ]
    } );
	
	// Application de la recherche
    table.columns().every( function () {
        var that = this;
 
        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );
	
	$( "#Recherche" ).click(function() {
		table.ajax.reload();
	});

	
	// Formulaire d'ajout d'un adhérent
	$('#formAdherent').submit(function(event) {
		event.preventDefault();
		$.ajax({
			 type: 'POST',
			 url: "/api/v1/adherent",
			 data: $('#formAdherent').serialize(), 
			 success: function(reponse) {
				$('#formAdherent')[0].reset();
				alert("Ajout de l'adherent " + reponse.data + " réussi"); 
			 },
			error: function(err) {
				alert("Erreur lors de l'ajout de l'adhrent : \n" + err.responseText);
			}
		});		
	});

} );
