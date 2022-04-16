let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const collectionContainer = document.getElementById("toy-collection")
  const addToyForm = document.querySelector("form")
  const nameField = document.querySelector("input[name='name']")
  const urlField = document.querySelector("input[name='image']")


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  addToyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let toyObject = {
    "name": nameField.value,
    "image": urlField.value,
    "likes": 0
    }
    postData(toyObject)
    loadDom(toyObject)
  })

  fetch("http://localhost:3000/toys/")
  .then(response => response.json())
  .then(data => createDom(data))

  function createDom(data) {
    data.forEach(item => {
      loadDom(item)
    });
  }
  function loadDom(item) {
    const div = document.createElement("div")
      div.setAttribute("class", "card")
      const header = document.createElement("h2").innerText = item.name
      const image = document.createElement("img")
      setAttributes(image, {"class": "toy-avatar", "src": `${item.image}`})
      const likes = document.createElement("p")
      likes.innerText = "4 likes"
      const btn = document.createElement("button")
      setAttributes(btn, {"class": "like-btn", "id": `${item.id}`})
      btn.innerText = "Like"

      div.append(header, image, likes, btn)
      collectionContainer.appendChild(div)
  }

  function postData(data) {
    fetch("http://localhost:3000/toys/", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json" 
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(toy => console.log(toy))
  }

  function setAttributes(el, attrs){
    for(let key in attrs) {
      el.setAttribute(key, attrs[key])
    }
  }
  
});
