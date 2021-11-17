let addTxt = document.getElementById('addTxt')
let addBtn = document.getElementById('addBtn')

addBtn.addEventListener('click', function () {
    let notesArray = []

    let notesFromLocalStorage = localStorage.getItem('notes')

    if (notesFromLocalStorage == null) {
        notesArray = []
    } else {
        notesArray = JSON.parse(notesFromLocalStorage)
    }

    notesArray.push(addTxt.value)

    localStorage.setItem('notes', JSON.stringify(notesArray))

    addTxt.value = ""

    displayNotes()

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
                  <h5 class="card-title">Note${index + 1}</h5>
                  <p class="card-text">${element}</p>
                   <button href="#" class="btn btn-success" id="${index}" onclick="deleteNotes(this.id)">Delete Note</button>                  </div>
              </div>         `
    })

    if  (notesArray.length !== 0 ) {
        notesElement.innerHTML = displayedNote
    }  else {
        notesElement.innerHTML = `
     <div class="alert alert-warning alert-dismissible fade show" role="alert"> Nothing to show add notes from above! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
     </button> 
     </div>
    `
    }
}

function deleteNotes(index)  {
    // console.log('i am deleting', index);

    let notesFromLocalStorage = localStorage.getItem('notes')

    if (notesFromLocalStorage == null) {
        notesArray = []
    } else {
        notesArray = JSON.parse(notesFromLocalStorage)
    }

    notesArray.splice(index, 1)

    localStorage.setItem('notes', JSON.stringify(notesArray))

    displayNotes()
}

displayNotes()
