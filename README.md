# testAdot
test technique pour Adot (Veepee)
https://github.com/AnaelD/testAdot

Objectif
Le but est de construire une API REST pour relier des impressions publicitaires et clics à une liste de
points d'intérêts.
Fonctionnement
L'API doit exposer une route sur laquelle nous enverrons un objet JSON décrivant les points
d'intérêts.
Exemple
[
 {
 "lat": 48.86,
 "lon": 2.35,
 "name": "Chatelet"
 },
 {
 "lat": 48.8759992,
 "lon": 2.3481253,
 "name": "Arc de triomphe"
 }
]
L'API doit relier chacune des impressions et clics présents dans le fichier events.csv au point
d'intérêt le plus proche, et retourner un résultat sous la forme suivante :
{
 "Chatelet": {
 "lat": 42.86,
 "lon": 2.35,
 "name": "Chatelet",
 "impressions": 136407,
 "clicks": 16350
 },
 "Arc de triomphe": {
 "lat": 48.8759992,
 "lon": 2.3481253,
 "name": "Arc de triomphe",
 "impressions": 63593,
 "clicks": 7646
 }
}

Il est à réaliser en TypeScript.
Il faudrait réaliser au minimum 1 test unitaire.
Merci de ne pas utiliser le type any.
La performance est un bonus alors attention :)
