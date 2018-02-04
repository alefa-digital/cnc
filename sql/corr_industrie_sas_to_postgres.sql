/*
	Script d'importation du fichier CSV : CORR_INDUSTRIE.csv
    - Création de la table de référence des industries
*/
DROP TABLE IF EXISTS public.CORR_INDUSTRIE CASCADE;
CREATE TABLE  public.CORR_INDUSTRIE  (
  "CODE_INDUSTRIE" character(2) NOT NULL PRIMARY KEY,
  "LIBELLE_INDUSTRIE" text NOT NULL
) ;
copy public.CORR_INDUSTRIE ("CODE_INDUSTRIE", "LIBELLE_INDUSTRIE") 
FROM '/data/nodejs/dev/cnc/CORR_INDUSTRIE.csv' DELIMITER ';' CSV HEADER ENCODING 'LATIN9' QUOTE '"' ESCAPE '''';