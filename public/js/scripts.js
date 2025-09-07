"use strict";
const fieldsets = document.querySelectorAll("fieldset");
let etape = 0;
let messageJSON;
function afficherEtape() {
    const etapes = document.querySelectorAll("fieldset");
    cacherFieldset();
    if (etape >= 0 && etape < etapes.length) {
        etapes[etape].classList.remove("cacher");
    }
}
function cacherFieldset() {
    const fieldsets = document.querySelectorAll("fieldset");
    fieldsets.forEach((fieldset) => {
        fieldset.classList.add("cacher");
    });
}
let boutonSuivant = document.getElementById('suivant');
let boutonPrecedent = document.getElementById('precedent');
boutonSuivant.addEventListener("click", naviguerSuivant);
boutonPrecedent.addEventListener("click", naviguerPrecedent);
function naviguerSuivant() {
    const etapeValide = validerEtape(etape);
    if (etapeValide) {
        if (etape < fieldsets.length - 1) {
            etape++;
            afficherEtape();
        }
    }
}
function naviguerPrecedent() {
    if (etape > 0) {
        etape--;
        afficherEtape();
    }
}
async function obtenirMessage() {
    const reponse = await fetch('objJSONMessages.json');
    messageJSON = await reponse.json();
    console.log("json ok :", messageJSON); // à régler (pq tout les messages de base sont là, mais pas ceux que j'ai rajoutés ?)
}
function validerChamp(champ) {
    let valide = true;
    const id = champ.id; // email
    const idMessageErreur = "erreur-" + id; // erreur-email
    const erreurElement = document.getElementById(idMessageErreur);
    // Vérifie chaque type d'erreur de validation
    if (champ.validity.valueMissing && messageJSON[id]?.vide) {
        valide = false;
        erreurElement.innerText = messageJSON[id].vide;
    }
    else if (champ.validity.typeMismatch && messageJSON[id]?.type) {
        // Type de données incorrect (email, url, tel, etc.)
        valide = false;
        erreurElement.innerText = messageJSON[id].type;
    }
    else if (champ.validity.patternMismatch && messageJSON[id]?.pattern) {
        // Ne correspond pas au pattern regex défini
        valide = false;
        erreurElement.innerText = messageJSON[id].pattern;
    }
    return valide;
}
function validerEtape(etape) {
    let etapeValide = false;
    switch (etape) {
        case 0:
            // CHAT GPT utilisé pour comprendre comment prendre le name. Car moi je pensais qu'il fallait renommer tt les ID en id="name".
            const dureeRadios = document.querySelectorAll('input[name="duree"]');
            const erreurFrequence = document.getElementById('erreur-duree');
            let dureeValide = false;
            dureeRadios.forEach(radio => {
                if (radio.checked)
                    dureeValide = true;
            });
            if (!dureeValide) {
                erreurFrequence.innerText = messageJSON['frequence']?.vide; // ?????????
            }
            else {
                erreurFrequence.innerText = '';
            }
            const montantRadios = document.querySelectorAll('input[name="montant"]');
            const autreMontant = document.getElementById('facultatif');
            const erreurMontant = document.getElementById('erreur-montant');
            let montantValide = false;
            montantRadios.forEach(radio => {
                if (radio.checked) {
                    montantValide = true;
                }
            });
            if (autreMontant.value !== "" && parseInt(autreMontant.value) > 0) {
                montantValide = true;
            }
            if (!montantValide) {
                erreurMontant.innerText = messageJSON['radio']?.vide; // ???????
            }
            else {
                erreurMontant.innerText = "";
            }
            etapeValide = dureeValide && montantValide;
            break;
        case 1:
            const nomElement = document.getElementById('nom');
            const prenomElement = document.getElementById('prenom');
            const emailElement = document.getElementById('email');
            const telephoneElement = document.getElementById('telephone');
            const nomValide = validerChamp(nomElement);
            const prenomValide = validerChamp(prenomElement);
            const emailValide = validerChamp(emailElement);
            const telephoneValide = validerChamp(telephoneElement);
            etapeValide = nomValide && prenomValide && emailValide && telephoneValide;
            break;
        case 2:
            // Pareil que le case 1, mais pour l'étape 2
            break;
    }
    return etapeValide;
}
function initialiser() {
    obtenirMessage();
    fieldsets.forEach(element => {
        element.classList.add("cacher");
    });
    fieldsets[0].classList.remove("cacher");
}
document.addEventListener("DOMContentLoaded", initialiser);
