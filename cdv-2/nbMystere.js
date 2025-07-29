const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let niveau = ""

function genererNombreMystere() {
  const max = getMaxForDifficulty(niveau)
  return Math.floor(Math.random() * max) + 1
}

function getMaxForDifficulty(niveau) {
  if (niveau === "facile") return 50
  else if (niveau === "moyen") return 100
  else return 500
}

let reponse = 0

function demanderDifficulte() {
  nbTentatives = 0 
  console.clear()
  console.log('═══════════════════════════════════════════════')
  console.log('              NOMBRE MYSTERE')
  console.log('═══════════════════════════════════════════════')
  console.log('')
  console.log('Choisissez votre niveau de difficulte :')
  console.log('')
  console.log('  [1] FACILE     - Nombre entre 1 et 50')
  console.log('  [2] MOYEN      - Nombre entre 1 et 100') 
  console.log('  [3] DIFFICILE  - Nombre entre 1 et 500')
  console.log('')
  console.log('───────────────────────────────────────────────')
  
  rl.question('Votre choix (1, 2, 3 / facile, moyen, difficile) : ', (answer) => {
    const choix = answer.toLowerCase().trim()
    let niveauChoisi = ""
    
    if (choix === "1" || choix === "facile") niveauChoisi = "facile"
    else if (choix === "2" || choix === "moyen") niveauChoisi = "moyen"
    else if (choix === "3" || choix === "difficile") niveauChoisi = "difficile"
    
    if (niveauChoisi) {
      niveau = niveauChoisi
      reponse = genererNombreMystere()
      console.log('')
      console.log(`Parfait ! Niveau ${niveau.toUpperCase()} selectionne.`)
      console.log(`Un nombre entre 1 et ${getMaxForDifficulty(niveau)} a ete choisi.`)
      console.log('A toi de le deviner...')
      console.log('')
      jouer()
    } else {
      console.log('')
      console.log('>>> Choix invalide. Veuillez entrer 1, 2, 3 ou le nom du niveau.')
      console.log('')
      setTimeout(() => demanderDifficulte(), 1500)
    }
  })
}

let tentative = 0

let nbTentatives = 0

function jouer() {
  rl.question(`[Tentative ${nbTentatives + 1}] Votre nombre : `, (answer) => {
    tentative = parseInt(answer)
    nbTentatives += 1
    
    if(isNaN(tentative)) {
      console.log('>>> Erreur : Veuillez entrer un nombre valide.')
      console.log('')
      return jouer()
    }
    
    const max = getMaxForDifficulty(niveau)
    if(tentative < 1 || tentative > max) {
      console.log(`>>> Erreur : Le nombre doit etre entre 1 et ${max}.`)
      console.log('')
      return jouer()
    }
    
    if(tentative === reponse) {
      console.log('')
      console.log('───────────────────────────────────────────────')
      console.log('               FELICITATIONS')
      console.log('───────────────────────────────────────────────')
      console.log(`  Nombre trouve : ${reponse}`)
      console.log(`  Tentatives    : ${nbTentatives}`)
      console.log(`  Difficulte    : ${niveau.toUpperCase()}`)
      console.log('───────────────────────────────────────────────')
      console.log('')
      creerSauvegarde()
      return rejouer()
    }
    else if (tentative > reponse) {
      console.log(`>>> TROP GRAND !`)
      console.log('')
      return jouer()
    }
    else {
      console.log(`>>> TROP PETIT !`)
      console.log('')
      return jouer()
    }
  })
}

function rejouer() {
  console.log('Souhaitez-vous rejouer ?')
  console.log('')
  console.log('  [O] OUI - Nouvelle partie')
  console.log('  [N] NON - Quitter le jeu')
  console.log('')
  
  rl.question('Votre choix (O/N) : ', (answer) => {
    const reponseNormalisee = answer.toLowerCase().trim()
    if(reponseNormalisee === 'o' || reponseNormalisee === 'oui') {
      return demanderDifficulte()
    }
    else if(reponseNormalisee === 'n' || reponseNormalisee === 'non') {
      console.log('')
      console.log('═══════════════════════════════════════════════')
      console.log('              A BIENTOT !')
      console.log('═══════════════════════════════════════════════')
      return rl.close()
    }
    else {
      console.log('>>> Reponse invalide. Veuillez repondre par O (oui) ou N (non).')
      console.log('')
      return rejouer()
    }
  })
}


console.log('Initialisation du jeu...')
console.log('')

function creerSauvegarde() {
  let data = {
    date: new Date().toISOString(),
    dateFormatee: new Date().toLocaleString('fr-FR'),
    tentatives: nbTentatives,
    nombreMystere: reponse,
    difficulte: niveau,
    rangeMax: getMaxForDifficulty(niveau)
  }
  
  try {
    const jsonData = JSON.stringify(data, null, 2)
    fs.writeFileSync('score.json', jsonData)
    console.log(`Partie sauvegardee dans score.json (${nbTentatives} tentative${nbTentatives > 1 ? 's' : ''})`)
  } catch (error) {
    console.log('Erreur lors de la sauvegarde:', error.message)
  }
}

demanderDifficulte()