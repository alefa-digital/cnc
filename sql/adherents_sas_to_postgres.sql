/*
	Script d'importation du fichier CSV : ADHERENTS.csv
    - Création d'una table temporaire (ADHERENTS_TMP) avec les données brutes, tel qu'elles sont
    	définies dans le fichier source
    - Création de la table final des adhérents : ADHERENTS à partir de la table TMP :
    		- Définition des formats des variables
            - Fusion de variables
*/
DROP TABLE IF EXISTS public.ADHERENTS_TMP ;
CREATE TABLE  public.ADHERENTS_TMP  (
  "NUMADHER" character(7) DEFAULT NULL,
  "NOM1" text DEFAULT NULL,
  "NOM2" text DEFAULT NULL,
  "ADR1" text DEFAULT NULL,
  "ADR2" text DEFAULT NULL,
  "CP" character(5) DEFAULT NULL,
  "VILLE" text DEFAULT NULL,
  "DEP" character(2) DEFAULT NULL,
  "LIBDEP" text DEFAULT NULL,
  "LIBREG" text DEFAULT NULL,
  "CODE_INDUSTRIE" character(2) DEFAULT NULL,    
  "LIBELLE_INDUSTRIE" text DEFAULT NULL,
  "SIRET" character(14) DEFAULT NULL,
  "CORRES1" text DEFAULT NULL,
  "CORRES2" text DEFAULT NULL,
  "TEL1" character(10) DEFAULT NULL,
  "TEL2" character(10) DEFAULT NULL,
  "PANEL" character(1) DEFAULT NULL,
  "EMAIL" text DEFAULT NULL,
  "EMAIL2" text DEFAULT NULL,
  "FAX" character(10) DEFAULT NULL,
  "SITE_WEB" text DEFAULT NULL,
  "COMMENTAIRE" text DEFAULT NULL,
  "DT_CRE" text DEFAULT NULL,
  "DT_SUPPR" text DEFAULT NULL,
  "DT_REACTIV" text DEFAULT NULL
) ;

copy public.ADHERENTS_TMP ("NUMADHER", "NOM1", "NOM2", "ADR1", "ADR2", "CP", "VILLE", "DEP", "LIBDEP", "LIBREG", "CODE_INDUSTRIE", "LIBELLE_INDUSTRIE", "SIRET", "CORRES1", "CORRES2", "TEL1", "TEL2", "PANEL", "EMAIL", "EMAIL2", "FAX", "SITE_WEB", "COMMENTAIRE", "DT_CRE", "DT_SUPPR", "DT_REACTIV") 
FROM 'D:/data/nodejs/dev/cnc/ADHERENTS.csv' DELIMITER ';' CSV HEADER ENCODING 'LATIN9' QUOTE '"' ESCAPE '''';