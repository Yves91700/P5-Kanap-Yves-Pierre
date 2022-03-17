//variable qui recupère les produits du panier dans le local storage

let basket = JSON.parse(localStorage.getItem("basket"));

//Variable qui stocke les id de chaque produits présent dans le panier
let products =[];

// Variable qui récupère l'orderId envoyé comme réponse par le serveur lors de la requête POST
let orderId = "";

// Condition de vérification si le panier existe et ou est vide et modification texte
if (basket === null || basket.length === 0) {
    document.querySelector("#titrePanier").textContent = "Le panier est vide !";
  } else {
    document.querySelector("#titrePanier").textContent = "Votre panier";
  }
  for (product of basket) {
    document.querySelector("#cart__items").innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${product.img}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p> Couleur du produit:${product.color}</p>
        <p> Prix unitaire:${product.price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p id="quantités"> Qté :${product.quantity} </p>
          <p id="sousTotal">Prix total pour cet article: ${product.totalPrice}€</p> 
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
  //recupération des id des produits et envoie dans le tableau variable product[]
    products.push(product.id);
    console.log(products);
  }

  // fonction récuperation des prix et de la somme total 
  let addPriceFunction = () => {
    console.log(basket);
    let found = basket.map((element) => element.totalPrice);
    console.log(found);

    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    let somme = found.reduce(reducer);
    console.log(somme);
    return somme; 
};

//fonction récupération des quantités et quantité total 
let addQuantFunction = () => {
    console.log(basket);
    let found2 = basket.map((element) => element.quantity);
    console.log(found2);

    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    let quant = found2.reduce (reducer);
    console.log(quant);
    return quant ;
};

// fonction  de mise à jour du local storage products
let majLocalStorageProducts = () => {
    localStorage.setItem("basket", JSON.stringify(basket))
};

// fonction pour l'injection dans le dom de données addPriceFunction et addQuantFunction
function injectSommeQant () {
    // appel de la fonction addPriceFunction qui donne la variable somme
    let sommeTotale = addPriceFunction();
    //injection de sommeTotale dans le dom
    document.querySelector("#totalPrice").textContent = sommeTotale;

    localStorage.setItem("sommeTotale", JSON.stringify(sommeTotale));

    //appel de la fonction addQuantFunction qui donne la variable quant
    let quantTotale = addQuantFunction();

    //injection de la quantité dans le dom 
    document.querySelector("#totalQuantity").textContent = quantTotale;

    localStorage.setItem("quantTotale", JSON.stringify(quantTotale));

    majLocalStorageProducts();

}
injectSommeQant();

console.log(basket);
let itemQuantity = Array.from(document.querySelectorAll(".itemQuantity"));
let sousTotal = Array.from(document.querySelectorAll("#sousTotal"));
let screenQuantity = Array.from(document.querySelectorAll("#quantités"));

// fonction pour pouvoir changer la quantité dans la quantité déroulant 
itemQuantity.forEach(function(quantity, i){
    quantity.addEventListener("change", (event) =>{
        event.preventDefault();
        let newArticlePrice = quantity.value * basket[i].price;
        console.log(quantity.value);

       screenQuantity[i].textContent = "Qté: " + quantity.value;
        basket[i].quantity = parseInt(quantity.value, 10);

        sousTotal[i].textContent = "prix total pour cet article:" + newArticlePrice + " €";
        basket[i].totalPrice = newArticlePrice;

        console.log(`le prix de ${basket[i].name} est passé à ${newArticlePrice}`);
        injectSommeQant();

    });
});

/******************************************Pour effectuer la suppression d'article****** */
// pour recuperer la node list des boutons supprimer et transformation en tableau avec Array.from

let supprimeSelection = Array.from(document.querySelectorAll(".deleteItem"));

//new tableau afin de recuperer le tableau basket  et de controler les suppression 
let tabControlSupp = [];

// création de la fonction de suppression 

function supprProduct() {
    for(let i = 0; i < supprimeSelection.length; i++) {
        // l'ecoute d'évenement au click sur le tableau des boutons supprimer 
        supprimeSelection[i].addEventListener("click",() => {
            // suppression de l'article visuel sur la page 
            supprimeSelection[i].parentElement.style.display = "none";

            // copie du tableau basket dans le tabControlSupp
            tabControlSupp = basket;

            // supprimer un element a chaque index [i] du tableau ecouté  avec Array.prototype.splice ()
            tabControlSupp.splice ([i], 1);

            // mise a jour du local storage 
            basket = localStorage.setItem("basket", JSON.stringify(tabControlSupp))

            // pour rafraichir la page apres suppression article 
            window.location.href = "cart.html";
        
        });
    }
}

supprProduct();

/*****************************************Formulaire************************ */