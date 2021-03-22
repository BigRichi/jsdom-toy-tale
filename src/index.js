let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  const toyCollection = document.querySelector("#toy-collection")

  // make a helper function div
  const displayToys = (toy) => {
    const outerDiv = document.createElement('div')
    outerDiv.dataset.id = toy.id
    outerDiv.classList.add('card')
    outerDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes}</p>
      <button class="like-btn">Like <3</button>
    `
    toyCollection.append(outerDiv)
  }

  function getAndysToys() {
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toysObject => {
      toysObject.forEach(toy => {
        displayToys(toy)
      })
    });
  }
  
  
  getAndysToys()

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block"
      
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  
  const createToyForm = document.querySelector('body > div.container > form')
  console.log(createToyForm)
  const toyForm = document.querySelector('form.add-toy-form')
  console.log(toyForm)

  toyForm.addEventListener('submit', function(event) {
    
    event.preventDefault()
    
    const name = event.target.name.value
    const image = event.target.image.value

   

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({name, image, likes: 0 })  
    })
    .then(response => response.json())
    .then(newToy => {
      displayToys(newToy)
    })

   toyForm.reset()
  })

  toyCollection.addEventListener('click', function (event){

    if (event.target.matches('button.like-btn')){
      const toyCard = event.target.closest('div')
      console.log(toyCard.id)

      const likes = event.target.previousElementSibling
      const newLikes = parseInt(likes.textContent) + 1

      fetch(`http://localhost:3000/toys/${toyCard.dataset.id}`, {
        method:'PATCH',
        headers:{
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({likes: newLikes})
      })
        .then(response => response.json())
        likes.textContent = newLikes
      // console.log()
    }
    

  })
  
});

