const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function afficherMenu() {
    console.log("\n=== LA CALCULETTE SOLIDEEE ROLEX ===");
    console.log("1. Additionner");
    console.log("2. Soustraire");
    console.log("3. Multiplier");
    console.log("4. Diviser");
    console.log("5. Se barrer");
    console.log("=============================");
}
function addition(a, b) {
    return a + b;
}

function soustraction(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    if (b === 0) {
        throw new Error("Diviser par zero ca marche pas???? t'es pas gaté le boss");
    }
    return a / b;
}

function demanderNombre(message, callback) {
    rl.question(message, (reponse) => {
        const nombre = parseFloat(reponse);
        if (!isNaN(nombre)) {
            callback(nombre);
        } else {
            console.log("Toi tu sais pas compter met un vrai nombre stp :");
            demanderNombre(message, callback);
        }
    });
}

function effectuerCalcul(operation, nombre1, nombre2) {
    switch (operation) {
        case '1':
            return addition(nombre1, nombre2);
        case '2':
            return soustraction(nombre1, nombre2);
        case '3':
            return multiplication(nombre1, nombre2);
        case '4':
            return division(nombre1, nombre2);
        default:
            throw new Error("Operation inconnue t'es perdu gros");
    }
}

function sessionCalcul() {
    afficherMenu();
    
    rl.question("Choisis (1-5) : ", (choix) => {
        
        if (choix === '5') {
            rl.close();
            return;
        }

        if (!['1', '2', '3', '4'].includes(choix)) {
            console.log()
            console.log("C'est entre 1 et 5 tdc");
            return sessionCalcul();
        }

        demanderNombre("Ton premier nombre : ", (nombre1) => {
            demanderNombre("Et maintenant le deuxieme : ", (nombre2) => {
                
                try {
                    const resultat = effectuerCalcul(choix, nombre1, nombre2);
                    console.log(`\nResultat : ${resultat}`);
                } catch (error) {
                    console.log(`Erreur : ${error.message}`);
                }

                rl.question("\nTu veut refaire un autre ? (y/n) : ", (recommencer) => {
                    if (recommencer.toLowerCase() === 'y') {
                        sessionCalcul();
                    } else {
                        console.log("Aller va te faire");
                        rl.close();
                    }
                });
            });
        });
    });
}

function demarrerCalculatrice() {
    console.log("Ouai bienvenue dans la calculatrice solide!");
    sessionCalcul();
}

demarrerCalculatrice();