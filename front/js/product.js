// Selection de l'id colors
const ColorSelected = document.querySelector("#colors");
 console.log(ColorSelected);

//Selection de la quantité
const QuantitySelected = document.querySelector("#quantity");
console.log(QuantitySelected);

// bouton Ajouter au panier
const BtnPanier = document.querySelector("#addToCart");
console.log(BtnPanier);


const GetProductId = () => {
    return new URL(location.href).searchParams.get("id");
};

const productId = GetProductId();

fetch(`http://localhost:3000/api/products/${productId}`)
.then((response) => {
    return response.json();
   // console.log(productId); test ok
})

.then((product) => {
    productSelected(product);
    productRegistred( product);
})
.catch((error) => {
    alert(error);
});

//fonction qui recupère les données de la promesse .then(product) pour injecter les valeurs dans le html

let productSelected = (product) => {
    //Ajout des données de l'objet selectionner dans le html 
    document.querySelector("head > title").textContent = product.name;
    document.querySelector(".item__img").innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.querySelector("#title").textContent += product.name;
    document.querySelector("#price").textContent += product.price;
    document.querySelector("#description").textContent += product.description;

    // selection de la couleur dans le html
    let ColorId = document.querySelector("#colors");
    
    //itération dans le tableau color de l'objet et insertion des variables dans le html 
for (color of product.colors){
let option = document.createElement("option");
option.innerHTML =`${color}`;
option.value =`${color}`;

ColorId.appendChild(option);
}
};

//Fonction qui enregistre dans un objet les options selectionné par l'utilisateur au click du bouton ajouter au panier
let productRegistred = (product) => {
    // ecoute de l'evenement click sur le bouton ajouter au panier
    BtnPanier.addEventListener("click",(event) =>{
        event.preventDefault();
 if (ColorSelected.value == false){
     confirm("Veuillez sélectionner une couleur ");
    }else if (QuantitySelected.value == 0){
         confirm("Veuillez sélectionner le nombre d'articles souhaités");
        } else {
             alert("Votre article a bien été rajouté au panier");
         }

         //enregistrement des valeurs dans l'objet  optionProduct
         let optionProduct = {
             id: product._id,
             name: product.name,
             img: product.imageUrl,
             altTxt: product.altTxt,
             description: product.description,
             color : ColorSelected.value,
             quantity: parseInt(QuantitySelected.value,10),
             price: product.price,
             totalPrice : product.price * parseInt(QuantitySelected.value,10),
         };
     console.log(optionProduct);

     /************************************** local storage ****************************************** */
 








    })
}


