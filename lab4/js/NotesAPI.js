export default class NotesAPI {
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
        //sorting notes with updated timestamp
        return notes.sort(this.sortNotes);
    }

    static sortNotes(a, b) {
        if (a.pin === b.pin) {
            return new Date(b.updated) - new Date(a.updated);
        };
        return Number(b.pin) - Number(a.pin);
    }

    static saveNote(noteToSave) {
        const notes = NotesAPI.getAllNotes();
        const existing = notes.find(note => note.id == noteToSave.id);

        //Update data
        if (existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.color = noteToSave.color;
            existing.pin = noteToSave.pin;
            existing.updated = new Date().toISOString();
        } else {
            //generating random id
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
        }

        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    static deleteNote(id) {
        const notes = NotesAPI.getAllNotes();
        //newNotes = all notes apart from the one with id
        const newNotes = notes.filter(note => note.id != id);

        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }


};