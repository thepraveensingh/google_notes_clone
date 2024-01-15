const addButton = document.querySelector('#add');

const updateLSData=() =>{
    const textAreaData = document.querySelectorAll('textarea');
    const notes =[];
    // console.log(textAreaData);
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })
    console.log(notes);

    localStorage.setItem('notes',JSON.stringify(notes));
}

const addNewNote = ( text = "" ) => {

    const note = document.createElement('div');
    note.classList.add('note');
    const htmlData = 
        `   <div class ="operation">
                <button class="edit"><i class="fa-solid fa-edit"></i></button>
                <button class="delete"><i class="fa-solid fa-trash-alt"></i></button>
            </div>
            <div class="main ${ text ? "" : "hidden"} "></div>
            <textArea class=  "${ text ? "hidden" : ""}"></textArea> `;
    
    note.insertAdjacentHTML('afterbegin',htmlData);
    // console.log(note);

    //getting the references
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textArea');

    //deleting the node
    delButton.addEventListener('click',() => {
        note.remove();
        updateLSData();
    });
    
    //toggle using edit
    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click',()=>{
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    textArea.addEventListener('change',(event) =>{
        const value = event.target.value;
        mainDiv.innerHTML= value;

        updateLSData();
        // console.log(value);
    });

    document.body.appendChild(note);
}

//getting data back from ls
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach((note) => 
    addNewNote(note)
    )
}

addButton.addEventListener('click',  ()=> addNewNote())