export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
            <div class="notes__sidebar">
                <button class="notes__add" type="button">Add note</button>
                <div class="notes__list">
                    <div class="notes__list-item"></div>
                </div>
            </div>
            <div class="notes__preview">
                <input type="text" class="notes__title" placeholder="New note...">
                <textarea class="notes__body">Take note...</textarea>
                <input type="text" class="notes__color" placeholder="Type color...">
                <span class="pin">Pin the note</span>
                <label class="switch">
                    <input type="checkbox" class="notes__pin">
                    <span class="slider round"></span>
                </label>
            </div>
        `;

        const btnAddNote = this.root.querySelector(".notes__add");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");
        const inpColor = this.root.querySelector(".notes__color");
        const inpPin = this.root.querySelector(".notes__pin");


        btnAddNote.addEventListener('click', () => {
            this.onNoteAdd();
        });

        [inpTitle, inpBody, inpColor, inpPin].forEach(inputField => {
            inputField.addEventListener('blur', () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();
                const updatedColor = inpColor.value.trim();
                const updatePin = inpPin.checked;

                this.onNoteEdit(updatedTitle, updatedBody, updatedColor, updatePin);
            });
        });

        this.updateNotePreviewVisibility(false);

    };

    _createListItemHTML(id, title, body, color, pin, updated) {
        const MAX_BODY_LENGTH = 60;

        return `
            <div  style="background-color:${color};" class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-color"></div>
                <div class="notes__small-pin">${pin ? "Pinned": "Not pinned"}</div>
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
            </div>
        `;
    }

    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notes__list");

        //Empty list
        notesListContainer.innerHTML = " ";

        for (const note of notes) {
            const html = this._createListItemHTML(
                note.id,
                note.title,
                note.body,
                note.color,
                note.pin,
                new Date(note.updated));

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        //Add select/delete events for each list item
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.addEventListener('click', () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener('dblclick', () => {
                const doDelete = confirm("Do you want to delete this note?");

                if (doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            })
        });
    }

    updateActiveNote(note) {
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;
        this.root.querySelector(".notes__color").value = note.color;
        this.root.querySelector(".notes__pin").checked = note.pin;

        //Setting up background color for selected note
        [this.root.querySelector(".notes__title"),
        this.root.querySelector(".notes__body"),
        this.root.querySelector(".notes__color"),
        this.root.querySelector(".notes__preview")].forEach(noteListItem => {
            noteListItem.style.backgroundColor = note.color;
        });

        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected");
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
};