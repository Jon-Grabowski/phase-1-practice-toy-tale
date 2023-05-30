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
    //create Div for our card.
    const cardDiv = document.createElement( 'div' )
    cardDiv.className = 'card'
    //Create h2 element and fill it
    const nameHeading = document.createElement( 'h2' )
    nameHeading.innerText = data[toy].name
    //create image element and fill it 
    const img = document.createElement( 'img' )
    img.src = data[toy].image
    img.className = ' toy-avatar '
    img.alt = data[toy].name
    //create p element and fill it
    const pElement = document.createElement( 'p' )
    pElement.innerText = `${data[toy].likes} likes`
    //create button element and fill it
    const button = document.createElement( 'button' )
    button.className = "like-btn"
    button.id = "[toy_id]"
    button.innerText = 'Like ❤️'
    //appending all our elements to the card Div
    cardDiv.append( nameHeading, img, pElement, button )
    //appending our car Div to the Toy Collection Div 
    toyCollection.append( cardDiv )

    //Like Button Functionality
    button.addEventListener('click', (e) => {
      data[toy].likes++
      pElement.innerText = `${data[toy].likes} likes`
    })
    //console.log(cardDiv)
    //console.log(data[toy].name) 
  }
}

// Handling the Submit Button and Creating New Card.
document.querySelector('form').addEventListener('submit', handleSubmit);


function handleSubmit(e) {
  e.preventDefault();

  let newCard = [{
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }]
  //console.log(newCard)
  buildCard(newCard);
  postCard(newCard[0]);
  //console.log(e.target.image.value);
}




function postCard(newCard) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(newCard)
  })
  .then(res => res.json())
  .then(card => console.log(card))  
}
