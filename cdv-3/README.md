# Gestionnaire de Tâches Console en JavaScript

Un gestionnaire de tâches simple en console

## Comment ça marche

- lances le programme avec `node gestionnaireTachesConsole.js`
- Tu choisis ce que tu veux faire dans le menu
- Tu peux ajouter, voir, modifier ou supprimer des tâches
- Tout se sauvegarde automatiquement dans un fichier `taches.json`

## Les fonctionnalités

- **Ajouter** une tâche avec une description
- **Voir** la liste des tâches (toutes, à faire, ou terminées)
- **Modifier** le statut d'une tâche (faite/à faire)
- **Supprimer** une tâche définitivement
- **Sauvegarde automatique** dans un fichier JSON
- **Chargement automatique** au démarrage

## Ce que j'ai utilisé

- `readline` pour l'interaction avec l'utilisateur
- `fs` pour la sauvegarde et le chargement des tâches
- `path` pour gérer les chemins de fichiers
- objets avec `id`, `description` et `status`
- fonctions `async/await` avec des Promises
- filtrage d'arrays avec `.filter()`
- `try/catch` pour gérer les erreurs de fichiers

## Le fichier de sauvegarde

Le programme crée un `taches.json` qui contient :
```json
{
  "taches": [
    {
      "id": 1,
      "description": "Faire les courses",
      "status": "à faire"
    },
    {
      "id": 2,
      "description": "Réviser JavaScript",
      "status": "faite"
    }
  ],
  "prochainId": 3
}
```
