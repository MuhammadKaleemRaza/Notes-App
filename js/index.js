let addTxt = document.getElementById('addTxt')
let addBtn = document.getElementById('addBtn')
let search = document.getElementById('searchText')
let titleTxt = document.getElementById('titleTxt')

addBtn.addEventListener('click', function () {
    let notesArray = []  //made an empty array to stor our notes

    let notesFromLocalStorage = localStorage.getItem('notes')  //get the notes from localStorage

    if (notesFromLocalStorage == null) {
        notesArray = []    //if there are not notes in the localStorage the array should be blank
    } else {
        notesArray = JSON.parse(notesFromLocalStorage) // if there are notes turn the string which is save in local storage into array and store in notes array
    }

    let myObj = {
        title: titleTxt.value,
        text: addTxt.value
    } //push the title and text into th objext

    notesArray.push(myObj)  //push the value of the content into the notes array

    localStorage.setItem('notes', JSON.stringify(notesArray))  //save the array into localStorage

    addTxt.value = "" //after saving the content box should be blank

    titleTxt.value = ""

    displayNotes()  //call the displaynotes function

})


function displayNotes() {

    let notesElement = document.getElementById('notes')

    let displayedNote = ""

    let notesFromLocalStorage = localStorage.getItem('notes')

    if (notesFromLocalStorage == null) {
        notesArray = []
    } else {
        notesArray = JSON.parse(notesFromLocalStorage)
    }

    notesArray.forEach(function (element, index) {
        displayedNote += `<div class="cardNote my-2 mx-2card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${element.title}</h5>
                  <p class="card-text">${element.text}</p>
                   <button href="#" class="btn btn-success" id="${index}" onclick="deleteNotes(this.id)">Delete Note</button>
                   </div>  
                   </div>
                   `
    })  //for every element into an array display this text 

    if (notesArray.length !== 0) {
        notesElement.innerHTML = displayedNote
    } else {
        notesElement.innerHTML = `
     <div class="alert alert-warning alert-dismissible fade show" role="alert"> Nothing to show add notes from above! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
     </button> 
     </div>
    `
    }
}

function deleteNotes(index) {
    // console.log('i am deleting', index);

    let notesFromLocalStorage = localStorage.getItem('notes')

    if (notesFromLocalStorage == null) {
        notesArray = []
    } else {
        notesArray = JSON.parse(notesFromLocalStorage)
    }

    notesArray.splice(index, 1)  //delete the array item from the notes index to 1 meaning only delete one item

    localStorage.setItem('notes', JSON.stringify(notesArray)) //update the local storage

    displayNotes()  //call the display noes function
}

displayNotes() //call the display notes function here because if we open or close the browser or refresh the saved notes should be there

search.addEventListener('input', function () {
    let searchValue = search.value.toLowerCase() //take the value of search value and turn it into lowercase

    let noteCard = document.getElementsByClassName('cardNote') //take the div where our notes are located

    Array.from(noteCard).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText
        if (cardTxt.includes(searchValue)) {
            element.style.display = "block"
        }
        else {
            element.style.display = "none"
        }

    }) //make array of that div and for every elemnt of that div grab the innertext of the paragraph if the value of the search includes the content of the para div's display should remain block if not should be none.
    // console.log('input event fired', searchValue)
})
