"use strict";
// Au chargement de la page
/**
/**
 * Obtenir les messages d’erreur
 * Récupérer les boutons et les fieldsets en HTML
 * Créer une fonction pour cacher/afficher les fieldsets selon l’étape
 * Changer la couleur du premier élément dans la navigation au chargement de la page et empêcher d'aller sur les autres étapes
 * Appeler la fonction gererAutreMontant pour la lancer dès le début
 */
function initialiser() {
    obtenirMessage();
    // Boutons
    let btnSuivant = document.getElementById("suivant");
    let btnPrecedent = document.getElementById("precedent");
    let btnFaireUnDon = document.getElementById("faire_don");
    const navLien = document.querySelectorAll(".navigation__item");
    const fieldsets = document.querySelectorAll("fieldset");
    let etape = 0;
    // cacher tous les fieldsets
    function cacherFieldset() {
        fieldsets.forEach((fieldset) => {
            fieldset.classList.add("cacher");
        });
        // Mettre au chargement de la page sur la premiere page le numéro en rose et impossible d'aller sur les autres pages
        for (let i = 0; i < navLien.length; i++) {
            const lien = navLien[i];
            if (i === 0) {
                lien.classList.remove("navigation__item--inactive");
                lien.classList.add("navigation__item--active");
                lien.setAttribute("aria-disabled", "false");
            }
            else {
                lien.classList.remove("navigation__item--active");
                lien.classList.add("navigation__item--inactive");
                lien.setAttribute("aria-disabled", "true");
            }
            lien.addEventListener("click", naviguerEtape);
            gererAutreMontant();
        }
    }
    let messagesJSON;
    // Récupérer les messages d'erreur à partir du fichier JSON
    async function obtenirMessage() {
        const reponse = await fetch("objJSONMessages.json");
        messagesJSON = await reponse.json();
    }
    // Valider les champs individuellement
    /**
     * Prendre un champ à la fois et lui attribuer un message d’erreur spécifique
     * Vérifier chaque type d’erreur de validation
     * Exemple : type de données incorrect (email, Nom, téléphone, etc.)
     * Ne correspond pas au pattern regex défini
     * Retourner "valide" si le champ n’a plus d’erreurs (true)
     */
    function validerChamp(champ) {
        let valide = false;
        const id = champ.id;
        const idMessageErreur = "erreur-" + id;
        const erreurElement = document.getElementById(idMessageErreur);
        // Vérifie chaque type d'erreur de validation
        if (champ.validity.valueMissing && messagesJSON[id].vide) {
            console.log("erreur", id);
            console.log("message", messagesJSON[id].vide, erreurElement);
            valide = false;
            erreurElement.innerText = messagesJSON[id].vide;
        }
        else if (champ.validity.typeMismatch && messagesJSON[id].type) {
            // Type de données incorrect (email, url, tel, etc.)
            valide = false;
            erreurElement.innerText = messagesJSON[id].type;
        }
        else if (champ.validity.patternMismatch && messagesJSON[id].pattern) {
            // Ne correspond pas au pattern regex défini
            valide = false;
            erreurElement.innerText = messagesJSON[id].pattern;
        }
        else {
            valide = true;
            erreurElement.innerText = "";
        }
        return valide;
    }
    // Valider une étape complète
    /**
     * Valider une étape à la fois (une par case)
     * Prendre tous les éléments HTML puis les convertir dans une variable
     * Vérifier si les boutons radio sont cochés (checked)
     * Si tout est bien coché, alors l’étape est retournée comme valide (true)
     */
    function validerEtape(etape) {
        let etapeValide = false;
        switch (etape) {
            // Étape 1 : Choix du montant
            case 0:
                const montantUnique = document.getElementById("unique");
                const montantMensuelle = document.getElementById("mensuelle");
                const erreurDuree = document.getElementById("erreur-duree");
                const montantPrix1 = document.getElementById("prix1");
                const montantPrix2 = document.getElementById("prix2");
                const montantPrix3 = document.getElementById("prix3");
                const montantPrix4 = document.getElementById("prix4");
                const montantPrix5 = document.getElementById("prix5");
                const montantPrix6 = document.getElementById("prix6");
                const autreMontant = document.getElementById("facultatif");
                let dureeValide = false;
                let montantValide = false;
                if (montantUnique.checked || montantMensuelle.checked) {
                    dureeValide = true;
                    erreurDuree.innerText = "";
                }
                if (montantPrix1.checked ||
                    montantPrix2.checked ||
                    montantPrix3.checked ||
                    montantPrix4.checked ||
                    montantPrix5.checked ||
                    montantPrix6.checked) {
                    montantValide = true;
                }
                else if (autreMontant.value !== "") {
                    montantValide = true;
                }
                if (dureeValide && montantValide) {
                    etapeValide = true;
                }
                break;
            // Étape 2 : Informations personnelles
            // Si tout est bien rempli, alors l’étape est retournée comme valide (true)
            case 1:
                const nomElement = document.getElementById("nom");
                const prenomElement = document.getElementById("prenom");
                const emailElement = document.getElementById("courriel");
                const telephoneElement = document.getElementById("telephone");
                const nomValide = validerChamp(nomElement);
                const prenomValide = validerChamp(prenomElement);
                const emailValide = validerChamp(emailElement);
                const telephoneValide = validerChamp(telephoneElement);
                if (nomValide && prenomValide && emailValide && telephoneValide) {
                    etapeValide = true;
                }
                break;
            // Étape 3 : Adresse civile
            // Si tout est bien rempli, alors l’étape est retournée comme valide (true)
            case 2:
                const adresseElement = document.getElementById("adresse");
                const villeElement = document.getElementById("ville");
                const provinceElement = document.getElementById("province");
                const codePostalElement = document.getElementById("codepostal");
                const adresseValide = validerChamp(adresseElement);
                const villeValide = validerChamp(villeElement);
                const provinceValide = validerChamp(provinceElement);
                const codePostalValide = validerChamp(codePostalElement);
                if (adresseValide &&
                    villeValide &&
                    provinceValide &&
                    codePostalValide) {
                    etapeValide = true;
                }
                break;
            // Étape 4 : Informations de paiement
            // Si tout est bien rempli, alors l’étape est retournée comme valide (true)
            case 3:
                const carteElement = document.getElementById("carte");
                const dateElement = document.getElementById("date");
                const cvcElement = document.getElementById("cvc");
                const carteValide = validerChamp(carteElement);
                const dateValide = validerChamp(dateElement);
                const cvcValide = validerChamp(cvcElement);
                if (carteValide && dateValide && cvcValide) {
                    etapeValide = true;
                }
        }
        return etapeValide;
    }
    // Ajouter la validation au change du champ carte de crédit (change : si on ne met pas tt un message apparait)
    function validationCarteChange() {
        const champCarte = document.getElementById("carte");
        if (champCarte) {
            champCarte.addEventListener("change", function () {
                validerChamp(champCarte);
            });
        }
    }
    // Autre montant
    //Cette fonction à été realiseé avec l'aide de L'IA. Car je n'arrivais pas à faire en sorte d'enlever le montant dans "autre montant" quand on cliquait sur une radio et inversement.
    function gererAutreMontant() {
        // On récupère toutes les radios
        const radiosMontant = document.querySelectorAll('input[name="montant"]');
        // On récupère le champ "autre montant"
        const inputAutre = document.getElementById("facultatif");
        // Quand l'utilisateur tape quelque chose dans "autre montant"
        inputAutre.addEventListener("input", function () {
            // On décoche toutes les radios
            radiosMontant.forEach(function (radio) {
                radio.checked = false;
            });
        });
        // Quand l'utilisateur clique sur une radio
        radiosMontant.forEach(function (radio) {
            radio.addEventListener("click", function () {
                // On vide le champ "autre montant"
                inputAutre.value = "";
            });
        });
    }
    // Navigation entre les liens
    /**
     * Savoir à qu'elle étape on est rendu
     * Cliquer sur une étape précédente, mais pas une étape suivante
     * Afficher l'étape qui a été cliquée
     */
    //pouvoir naviguer entre les liens en fonction des étapes
    function naviguerEtape(event) {
        const etapeElement = event.currentTarget;
        let numero = parseInt(etapeElement.dataset.etape) - 1;
        if (numero <= etape) {
            etape = numero;
            afficherEtape();
        }
    }
    //Mettre à jour les boutons de navigation (changer les couleurs selon que l’étape est validée ou non)
    function activerLienCouleur() {
        for (let i = 0; i < navLien.length; i++) {
            if (i <= etape) {
                navLien[i].classList.add("navigation__item--active");
                navLien[i].classList.remove("navigation__item--inactive");
                navLien[i].setAttribute("aria-disabled", "false");
            }
            else {
                navLien[i].classList.add("navigation__item--inactive");
                navLien[i].classList.remove("navigation__item--active");
                navLien[i].setAttribute("aria-disabled", "true");
            }
        }
    }
    // Afficher l’étape actuelle et cacher les autres
    function afficherEtape() {
        cacherFieldset();
        if (etape >= 0 && etape < fieldsets.length) {
            fieldsets[etape].classList.remove("cacher");
        }
        activerLienCouleur();
        validationCarteChange();
        // Affichage et masquage des boutons en fonction des étapes
        if (etape === 0) {
            btnSuivant?.classList.remove("cacher");
            btnFaireUnDon?.classList.add("cacher");
            btnPrecedent?.classList.add("cacher");
        }
        else if (etape === fieldsets.length - 1) {
            afficherRecapitulatif();
            btnFaireUnDon?.classList.remove("cacher");
            btnPrecedent?.classList.remove("cacher");
            btnSuivant?.classList.add("cacher");
        }
        else {
            btnSuivant?.classList.remove("cacher");
            btnPrecedent?.classList.remove("cacher");
            btnFaireUnDon?.classList.add("cacher");
        }
    }
    // Boutons de navigation
    btnSuivant?.addEventListener("click", boutonSuivant);
    btnPrecedent?.addEventListener("click", boutonPrecedent);
    // Bouton "Suivant" pour afficher les étapes suivantes
    function boutonSuivant() {
        const etapeValide = validerEtape(etape);
        if (etapeValide) {
            if (etape < fieldsets.length - 1) {
                etape++;
                afficherEtape();
            }
        }
    }
    // Bouton "Précédent" pour afficher les étapes précédentes
    function boutonPrecedent() {
        if (etape > 0) {
            etape--;
            afficherEtape();
        }
    }
    // Afficher le récapitulatif (dernière étape)
    function afficherRecapitulatif() {
        // Récupérer les valeurs des champs du formulaire
        const recapitulatif = document.getElementById("etape5");
        const nom = document.getElementById("nom");
        const nomRecap = nom.value;
        const prenom = document.getElementById("prenom");
        const prenomRecap = prenom.value;
        const montantDon = document.querySelector('input[name="montant"]:checked');
        const montantFacultatif = document.getElementById("facultatif");
        // Choisir le montant à afficher entre le montant sélectionné par defaut ou non et le montant facultatif
        let montantAfficher = "";
        if (montantFacultatif.value) {
            montantAfficher = montantFacultatif.value;
        }
        else if (montantDon) {
            montantAfficher = montantDon.value;
        }
        // Récupérer les valeurs des autres champs
        const email = document.getElementById("courriel");
        const emailRecap = email.value;
        const codePostal = document.getElementById("codepostal");
        const codePostalRecap = codePostal.value;
        const numeroCarte = document.getElementById("carte");
        const numeroCarteRecap = numeroCarte.value;
        const carteSubstring = numeroCarteRecap.substring(11, 15);
        //Prendre chaque balise p dans le html et y insérer les valeurs
        const recapHTML = recapitulatif.querySelectorAll("p");
        recapHTML[0].innerHTML = "Nom : " + nomRecap;
        recapHTML[1].innerHTML = "Prénom : " + prenomRecap;
        recapHTML[2].innerHTML = "Montant du don : " + montantAfficher + "$";
        recapHTML[3].innerHTML = "Email : " + emailRecap;
        recapHTML[4].innerHTML = "Code postal : " + codePostalRecap;
        recapHTML[5].innerHTML = "Numéro de carte finnisant par : " + carteSubstring;
    }
    // Debuter l’affichage
    afficherEtape();
}
document.addEventListener("DOMContentLoaded", initialiser);
