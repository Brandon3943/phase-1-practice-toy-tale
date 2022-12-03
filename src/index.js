let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
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

function init() {
fetch("http://localhost:3000/toys")
  .then(responce => responce.json())
  .then(data => {
    data.forEach(cardObj => renderCard(cardObj)) 
  })
}

init();

  function renderCard(cardObj) {
    console.log('this function is running')
    let collection = document.querySelector("#toy-collection");
    let div = document.createElement('div');
    div.className = "card";
    collection.append(div);
    let toysName = document.createElement('h2');
    toysName.textContent = cardObj.name;
    console.log(div);

    let image = document.createElement("img");
    image.src = cardObj.image;
    image.className = "toy-avatar";
    image.alt = "chacater";

    let p = document.createElement("p");
    if(cardObj.likes === 0 || cardObj.likes > 1) {
      p.textContent = `${cardObj.likes} likes`;
    } else {
      p.textContent = `${cardObj.likes} like`;
    }


    let likeBtn = document.createElement("button");
    likeBtn.className = "like-btn";
    likeBtn.textContent = "like ❤️";
    likeBtn.setAttribute('id', cardObj.id)
    likeBtn.addEventListener('click', () => updateLikes(cardObj.id, p))
    div.append(toysName, image, p, likeBtn);
  }
  
  let form = document.querySelector("form");
  form.addEventListener('submit', newToy)

  function newToy(event) {
    event.preventDefault();
    let name = document.querySelector(".input-text");
    let img = document.querySelectorAll(".input-text")[1];
    postNewToy(name, img);
  
  }

  function postNewToy(name, img) {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: name.value,
        image: img.value,
        likes: 0
      }),
    })
    .then(response => response.json())
    .then(data => renderCard(data))
  }

  


  function updateLikes(id, p) {
    let likes = ++p.textContent.split(' ')[0];
    console.log(likes);
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({likes: likes})
    })
    .then(response => response.json())
    .then(data => {
      if(data.likes === 0 || data.likes > 1) {
        p.textContent = `${data.likes} likes`;
      } else {
        p.textContent = `${data.likes} like`;
      }
     
    })
     
  }