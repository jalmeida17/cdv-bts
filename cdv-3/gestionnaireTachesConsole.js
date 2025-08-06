const fs = require('fs');
const readline = require('readline');
const path = require('path');

const FICHIER_TACHES = path.join(__dirname, 'taches.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let taches = [];
let prochainId = 1;

function poserQuestion(question) {
    return new Promise(resolve => {
        rl.question(question, resolve);
    });
}

function chargerTaches() {
    try {
        if (fs.existsSync(FICHIER_TACHES)) {
            const donnees = fs.readFileSync(FICHIER_TACHES, 'utf8');
            const donneesParsees = JSON.parse(donnees);
            taches = donneesParsees.taches || [];
            prochainId = donneesParsees.prochainId || 1;
            console.log('Tâches chargées.');
        } else {
            console.log('Aucun fichier de tâches trouvé. Une nouvelle liste sera utilisée.');
        }
    } catch (error) {
        console.error('Erreur lors du chargement des tâches :', error.message);
        console.log('Une nouvelle liste sera utilisée.');
    }
}

function sauvegarderTaches() {
    try {
        const donnees = {
            taches: taches,
            prochainId: prochainId
        };
        fs.writeFileSync(FICHIER_TACHES, JSON.stringify(donnees, null, 2));
        console.log('Tâches sauvegardées.');
    } catch (error) {
        console.error('Erreur lors de la sauvegarde :', error.message);
    }
}

async function ajouterTache() {
    console.log('\n--- Ajouter une tâche ---');

    const description = await poserQuestion('Entrez la description de la tâche : ');

    if (!description.trim()) {
        console.log('La description ne peut pas être vide.');
        return;
    }

    const nouvelleTache = {
        id: prochainId++,
        description: description.trim(),
        status: 'à faire'
    };

    taches.push(nouvelleTache);
    sauvegarderTaches();

    console.log(`Tâche ajoutée (ID: ${nouvelleTache.id})`);
}

async function afficherTaches() {
    console.log('\n--- Liste des tâches ---');

    if (taches.length === 0) {
        console.log('Aucune tâche enregistrée.');
        return;
    }

    console.log('1. Toutes les tâches');
    console.log('2. Tâches à faire');
    console.log('3. Tâches terminées');

    const choix = await poserQuestion('Choisissez un filtre (1-3) : ');

    let tachesFiltrees;
    let titre;

    switch (choix) {
        case '2':
            tachesFiltrees = taches.filter(t => t.status === 'à faire');
            titre = 'Tâches à faire';
            break;
        case '3':
            tachesFiltrees = taches.filter(t => t.status === 'faite');
            titre = 'Tâches terminées';
            break;
        default:
            tachesFiltrees = taches;
            titre = 'Toutes les tâches';
    }

    console.log(`\n--- ${titre} ---`);

    if (tachesFiltrees.length === 0) {
        console.log('Aucune tâche trouvée pour ce filtre.');
        return;
    }

    tachesFiltrees.forEach(tache => {
        const statut = tache.status === 'faite' ? 'faite' : 'à faire';
        console.log(`[ID: ${tache.id}] (${statut}) ${tache.description}`);
    });

    console.log(`\nTotal : ${tachesFiltrees.length} tâche(s)`);
}

async function modifierStatutTache() {
    console.log('\n--- Modifier le statut d\'une tâche ---');

    if (taches.length === 0) {
        console.log('Aucune tâche à modifier.');
        return;
    }

    console.log('\nTâches disponibles :');
    taches.forEach(tache => {
        const statut = tache.status === 'faite' ? 'faite' : 'à faire';
        console.log(`[ID: ${tache.id}] (${statut}) ${tache.description}`);
    });

    const idStr = await poserQuestion('\nEntrez l\'ID de la tâche à modifier : ');
    const id = parseInt(idStr);

    const tache = taches.find(t => t.id === id);

    if (!tache) {
        console.log('Tâche non trouvée.');
        return;
    }

    tache.status = tache.status === 'faite' ? 'à faire' : 'faite';

    sauvegarderTaches();

    console.log(`Tâche "${tache.description}" marquée comme "${tache.status}".`);
}

async function supprimerTache() {
    console.log('\n--- Supprimer une tâche ---');

    if (taches.length === 0) {
        console.log('Aucune tâche à supprimer.');
        return;
    }

    console.log('\nTâches disponibles :');
    taches.forEach(tache => {
        const statut = tache.status === 'faite' ? 'faite' : 'à faire';
        console.log(`[ID: ${tache.id}] (${statut}) ${tache.description}`);
    });

    const idStr = await poserQuestion('\nEntrez l\'ID de la tâche à supprimer : ');
    const id = parseInt(idStr);

    const index = taches.findIndex(t => t.id === id);

    if (index === -1) {
        console.log('Tâche non trouvée.');
        return;
    }

    const tache = taches[index];

    const confirmation = await poserQuestion(`Êtes-vous sûr de vouloir supprimer "${tache.description}" ? (o/n) : `);

    if (confirmation.toLowerCase() === 'o' || confirmation.toLowerCase() === 'oui') {
        taches.splice(index, 1);
        sauvegarderTaches();
        console.log('Tâche supprimée.');
    } else {
        console.log('Suppression annulée.');
    }
}

function afficherMenu() {
    console.log('\n' + '='.repeat(40));
    console.log('Gestionnaire de Tâches Console');
    console.log('='.repeat(40));
    console.log('1. Ajouter une tâche');
    console.log('2. Voir les tâches');
    console.log('3. Modifier le statut d\'une tâche');
    console.log('4. Supprimer une tâche');
    console.log('5. Quitter');
    console.log('='.repeat(40));
}

async function menuPrincipal() {
    let continuer = true;

    while (continuer) {
        afficherMenu();

        const choix = await poserQuestion('Choisissez une option (1-5) : ');

        switch (choix) {
            case '1':
                await ajouterTache();
                break;
            case '2':
                await afficherTaches();
                break;
            case '3':
                await modifierStatutTache();
                break;
            case '4':
                await supprimerTache();
                break;
            case '5':
                console.log('\nAu revoir.');
                continuer = false;
                break;
            default:
                console.log('Option invalide. Choisissez entre 1 et 5.');
        }

        if (continuer) {
            await poserQuestion('\nAppuyez sur Entrée pour continuer...');
        }
    }

    rl.close();
}

async function main() {
    console.log('Lancement du gestionnaire de tâches...\n');
    chargerTaches();
    await menuPrincipal();
}

process.on('SIGINT', () => {
    console.log('\n\nFermeture de l\'application.');
    rl.close();
    process.exit(0);
});

if
    (require.main === module) {
        main().catch(error => {
            console.error('Erreur dans le gestionnaire de tâches :', error.message);
            rl.close();
        });
    }

module.exports = {
    ajouterTache,
    afficherTaches,
    modifierStatutTache,
    supprimerTache
};