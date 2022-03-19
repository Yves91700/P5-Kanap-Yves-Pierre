
const GetProductId = () => {
    return new URL(location.href).searchParams.get("id");
};
const orderId = GetProductId();

const basket = JSON.parse(localStorage.getItem("basket"));

const total = JSON.parse(localStorage.getItem("sommeTotale"));

const idConfirmation = document.querySelector("#orderId");


// fonction pour afficher l'etat de la commande orderId dans le dom

(function () {
   idConfirmation.innerHTML = `
  <p>Commande validée ! <br>Votre numéro de commande est : 
  <strong>${orderId}</strong></p> 
  `;
})();
localStorage.clear();

