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
            </div>
        `;

        const btnAddNote = this.root.querySelector(".notes__add");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");
        const inpColor = this.root.querySelector(".notes__color");

        btnAddNote.addEventListener('click', () => {
            this.onNoteAdd();
        });

        [inpTitle, inpBody, inpColor].forEach(inputField => {
            inputField.addEventListener('blur', () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();
                const updatedColor = inpColor.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody, updatedColor);
            });
        });
    };
};