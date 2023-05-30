let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

});

function getToys() {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then((data) => {
      buildCard(data);
    });
};

function buildCard(data) {
  const toyCollection = document.getElementById('toy-collection');
  for (let toy in data) {
    const cardDiv = document.createElement( 'div' )
    cardDiv.className = 'card'
    const nameHeading = document.createElement( 'h2' )
    nameHeading.innerText = data[toy].name 
    const img = document.createElement( 'img' )
    img.src = data[toy].image
    img.className = ' toy-avatar '
    const pElement = document.createElement( 'p' )
    pElement.innerText = `${data[toy].likes} likes`
    const button = document.createElement( 'button' )
    button.className = "like-btn"
    button.id = "[toy_id]"
    button.innerText = 'Like ❤️'
    cardDiv.append( nameHeading, img, pElement, button )
    toyCollection.append( cardDiv )

    console.log(cardDiv)
    //console.log(data[toy].name) 
  }
}