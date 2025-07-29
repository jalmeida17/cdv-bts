# Jeu du Nombre Mystère en JavaScript

Un jeu de devinette de nombre en node pour joss

## Comment ça marche

- Tu lances le programme avec `node nbMystere.js`
- Tu choisis la difficulté (facile, moyen ou difficile)
- Tu essaies de deviner le nombre mystère
- Le jeu te dit si c'est trop grand ou trop petit
- Quand tu trouves, ça sauvegarde tes stats dans un fichier `score.json` dans le même répertoire

## Les niveaux de difficulté

- **Facile** : nombre entre 1 et 50
- **Moyen** : nombre entre 1 et 100  
- **Difficile** : nombre entre 1 et 500

## Ce que j'ai utilisé

- `readline` pour l'interaction avec l'utilisateur
- `fs` pour la sauvegarde des scores
- `Math.random()` et `Math.floor()` pour la génération aléatoire
- `try/catch` pour gérer les erreurs de sauvegarde
- récursion pour les boucles de jeu
- validation d'entrée utilisateur

## Le fichier de sauvegarde

Le jeu crée un `score.json` qui contient :
```json
{
  "date": "2025-07-29T...",
  "dateFormatee": "29/07/2025 à 14:30:25",
  "tentatives": 5,
  "nombreMystere": 42,
  "difficulte": "moyen",
  "rangeMax": 100
}
```
