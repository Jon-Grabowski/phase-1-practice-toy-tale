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
    console.log(nameHeading)
    //console.log(data[toy].name) 
  }
}