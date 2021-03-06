
// variable contenant l'api
const KanapApi = "http://localhost:3000/api/products";
console.log(KanapApi);

// requete http de type GET vers l'api en utilisant "Fetch"en faisant une promise avec la methode .then

fetch(KanapApi)
.then((response) => {
    return response.json();
})
.then((products) => {
    console.log(products);
    // boucle utilisation de "for of " qui permet 'itérer sur les valeurs d'un array
    for (data of products){
        console.log(data);
        document.getElementById("items").innerHTML += `<a href="./product.html?id=${data._id}">
        <article>
          <img src="${data.imageUrl}" alt="${data.altTxt}"/>
          <h3 class="productName">${data.name}</h3>
          <p class="productDescription">${data.description}</p>
        </article>
      </a>`;
    }
})
//message erreur si la requête n'a pas de reponse 
.catch((err) => {
    alert(error);
});


   

   






    



