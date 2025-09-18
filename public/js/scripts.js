"use strict";
function initialiser() {
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
        // mettre au chargement de la page sur la premiere page le bouton en rose et impossible d'aller sur les autres pages
        navLien.forEach((itemHTML, positionElement) => {
            if (positionElement === 0) {
                itemHTML.classList.remove("navigation__item--inactive");
                itemHTML.classList.add("navigation__item--active");
                itemHTML.ariaDisabled = "false";
            }
            else {
                itemHTML.classList.remove("navigation__item--active");
                itemHTML.classList.add("navigation__item--inactive");
                itemHTML.ariaDisabled = "true";
            }
        });
        navLien.forEach(etapeElement => {
            etapeElement.addEventListener("click", naviguerEtape);
        });
    }
    //pouvoir naviguer entre les liens en fonction des étapes
    function naviguerEtape(event) {
        const etapeElement = event.currentTarget;
        let numero = parseInt(etapeElement.dataset.etape) - 1;
        if (numero <= etape) {
            etape = numero;
            afficherEtape();
        }
    }
    //activer la couleur des liens en fonction de l'étape
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
    function afficherEtape() {
        cacherFieldset();
        if (etape >= 0 && etape < fieldsets.length) {
            fieldsets[etape].classList.remove("cacher");
        }
        activerLienCouleur();
        // Affichage et masquage des boutons
        if (etape === 0) {
            btnSuivant?.classList.remove("cacher");
            btnFaireUnDon?.classList.add("cacher");
            btnPrecedent?.classList.add("cacher");
        }
        else if (etape === fieldsets.length - 1) {
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
    function boutonSuivant() {
        if (etape < fieldsets.length - 1) {
            etape++;
            afficherEtape();
        }
    }
    function boutonPrecedent() {
        if (etape > 0) {
            etape--;
            afficherEtape();
        }
    }
    // Événements
    btnSuivant?.addEventListener("click", boutonSuivant);
    btnPrecedent?.addEventListener("click", boutonPrecedent);
    // Initialiser l’affichage
    afficherEtape();
}
document.addEventListener("DOMContentLoaded", initialiser);
