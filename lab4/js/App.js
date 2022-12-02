import NotesView from "./NotesView.js";
import NotesAPI from "./notesAPI.js";

export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());

        this._refreshNotes();
    }

    _refreshNotes() {
        const notes = NotesAPI.getAllNotes();

        this._setNotes(notes);

        if (notes.length > 0) {
            this._setActiveNote(notes[0]);
        };
    }

    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }

    _handlers() {
        return {
            onNoteSelect: noteId => {
                console.log("Note selected:" + noteId);
                const selectedNote = this.notes.find(note => note.id == noteId);
                this._setActiveNote(selectedNote);
            },
            onNoteAdd: () => {
                console.log("Note added");
                const newNote = {
                    title: "New note",
                    body: "Type here...",
                    color: "#009578",
                };

                NotesAPI.saveNote(newNote);
                this._refreshNotes();
            },
            onNoteEdit: (title, body, color) => {
                console.log(title, body, color);
                NotesAPI.saveNote({
                    id: this.activeNote.id,
                    title,
                    body,
                    color,
                });
                this._refreshNotes();
            },
            onNoteDelete: noteId => {
                console.log("Note deleted:" + noteId);
                NotesAPI.deleteNote(noteId);
                this._refreshNotes();
            },
        };
    }
};