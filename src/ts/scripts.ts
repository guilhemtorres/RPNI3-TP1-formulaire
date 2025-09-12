"use strict";
//Tt les boutons
let btnSuivant = document.getElementById("suivant");
let btnPrecedent = document.getElementById("precedent");
let btnFaireUnDon = document.getElementById("faire_don");
//Prendre tt les fieldsets
const fieldsets = document.querySelectorAll("fieldset");
// Savoir l'étape actuelle
let etape = 0;
afficherEtape();

//Cacher les étapes
function cacherFieldset() {
  fieldsets.forEach((fieldset) => {
    fieldset.classList.add("cacher");
  });
}

//Afficher les étapes
function afficherEtape() {
  let num_etape = document.getElementById("num_etape");
  cacherFieldset();

  if (etape >= 0 && etape < fieldsets.length) {
    fieldsets[etape].classList.remove("cacher");
  }

  //Pour cacher ou afficher les boutons en fonction des étapes actives 
  if (etape === 0) {
    btnSuivant?.classList.remove("cacher");
    btnFaireUnDon?.classList.add("cacher");
    btnPrecedent?.classList.add("cacher");
  } else if (etape === fieldsets.length - 1) {
    btnFaireUnDon?.classList.remove("cacher");
    btnPrecedent?.classList.remove("cacher");
    btnSuivant?.classList.add("cacher");
  } else {
    btnSuivant?.classList.remove("cacher");
    btnPrecedent?.classList.remove("cacher");
    btnFaireUnDon?.classList.add("cacher");
  }
  // if(num_etape){
  //   num_etape.innerText = etape + 1; //afficher le numéro de t'étape en meme temps
  // }
}


btnSuivant?.addEventListener("click", boutonSuivant);
btnPrecedent?.addEventListener("click", boutonPrecedent);

//bouton suivant
function boutonSuivant() {
  if (etape < fieldsets.length - 1) {
    etape++;
    afficherEtape();
  }
}

//bouton précedent
function boutonPrecedent() {
  if (etape > 0) {
    etape--;
    afficherEtape();
  }
}

//Num des étapes qui s'affichent en fonction de l'étape sélectionné 
const refUl = document.querySelector('ul');
const refLi = document.querySelector('li');
const refNavigation = document.getElementsByClassName('navigation')
const refNumero = document.createElement('a')

function changerNumeroEtape(){
    
}

