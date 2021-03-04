document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
})

function fetchDogs(){
    fetch("http://localhost:3000/dogs")
    .then(r => r.json())
    .then(dogs => {
        dogs.forEach(dog => regDogs(dog))
    })
}

function regDogs(dog){
    let table = document.querySelector("table")
    let tr = document.createElement("tr")
    let td1 = document.createElement("td")
    let td2 = document.createElement("td")
    let td3 = document.createElement("td")
    let td4 = document.createElement("td")
    let btn = document.createElement("button")
    tr.className = "padding"
    tr.id = dog.id
    td1.className = "padding center"
    td2.className = "padding center"
    td3.className = "padding center"
    td4.className = "padding center"
    btn.textContent = "Edit"
    td4.appendChild(btn)
    td1.textContent = dog.name
    td2.textContent = dog.breed
    td3.textContent = dog.sex
    tr.append(td1, td2, td3, td4)
    table.append(tr)
    btn.addEventListener('click', editDog)
}

function editDog(e){
    let td = e.target.parentElement
    let trParent = td.parentElement
    let valueForm = trParent.querySelectorAll("td")
    let form = document.getElementById("dog-form")
    form.dataset.id = trParent.id
    let formEl = form.querySelectorAll("input")
    formEl[0].value = valueForm[0].textContent
    formEl[1].value = valueForm[1].textContent
    formEl[2].value = valueForm[2].textContent
    form.addEventListener("submit", updateDog)
}

function updateDog(e){
    e.preventDefault();
    let form = e.target
    let formValues = form.querySelectorAll("input")
    let dogURL = `http://localhost:3000/dogs/${e.target.dataset.id}`
    let dogUpdate = {"name": formValues[0].value , "breed": formValues[1].value , "sex": formValues[2].value}
    let config = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(dogUpdate)
    }
    fetch(dogURL, config)
    .then(r => r.json())
    .then(() => {
        let table = document.querySelector("table")
        table.innerHTML = 
        `<thead class='blue'>
            <tr class='padding'>
              <th class='padding center'>Name</th>
              <th class='padding center'>Breed</th>
              <th class='padding center'>Sex</th>
              <th class='padding center'>Edit Dog</th>
            </tr>
          </thead>`
        fetchDogs();
    })
}

//Below Code updates individual dog row instead of returning the entire updated set after the patch request


// function updateDog(e){
//     e.preventDefault();
//     let form = e.target
//     let formValues = form.querySelectorAll("input")
//     let dogURL = `http://localhost:3000/dogs/${e.target.dataset.id}`
//     let dogUpdate = {"name": formValues[0].value , "breed": formValues[1].value , "sex": formValues[2].value}
//     let config = {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(dogUpdate)
//     }
//     fetch(dogURL, config)
//     .then(r => r.json())
//     .then(dog => updateReg(dog))
// }

// function updateReg(dog){
//     let tr = document.getElementById(`${dog.id}`)
//     let tdUpdated = tr.querySelectorAll("td")
//     tdUpdated[0].textContent = dog.name
//     tdUpdated[1].textContent = dog.breed
//     tdUpdated[2].textContent = dog.sex
// }