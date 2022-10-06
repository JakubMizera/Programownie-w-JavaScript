const numForm = document.querySelector('.numForm');
const btn = document.querySelector('.btn');
const btnCancel = document.querySelector('.cancel');


const numberInput = document.querySelector('.numInput');

const newInput = document.createElement('input');
newInput.setAttribute('type', 'text');
newInput.className = 'numInput';
const copyInput = newInput.cloneNode(true);

btn.addEventListener('click', () => {
    numForm.appendChild(copyInput);
})

btnCancel.addEventListener('click', () => {
    numForm.removeChild(copyInput);
})



