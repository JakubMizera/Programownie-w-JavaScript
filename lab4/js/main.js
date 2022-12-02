import NotesAPI from './NotesAPI.js';
import NotesView from './NotesView.js';

NotesAPI.saveNote({
    id: 28511,
    title: "changed title",
    body: "im updated note",
    color: "red",
    pin: false,
})

// NotesAPI.deleteNote(624700);

console.log(NotesAPI.getAllNotes())



const app = document.getElementById("app");
const view = new NotesView(app, {
    onNoteAdd() {
        console.log('lets add a new note')
    },
    onNoteEdit(newTitle, newBody, newColor) {
        console.log(newTitle);
        console.log(newBody);
        console.log(newColor);
    }
})