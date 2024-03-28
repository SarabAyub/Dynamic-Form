const addInputButton = document.getElementById('addInput');
const dynamicForm = document.getElementById('dynamicForm');
const customTypeSelect = document.getElementById('customType');
const countDiv = document.getElementById('countDiv');
const countSelect = document.getElementById('countSelect');
const countDivInput = document.getElementById('countDivInput');

countDiv.style.display = 'none';

function resetInputFields() {
    countSelect.value = 0;    
    customTypeSelect.value = 'text';
    customInputLabel.value = '';
    countDivInput.innerHTML = '';
    countDiv.style.display = 'none';     
}

function createInput(type, name, id, value = '', placeholder = '') {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.value = value;
    input.id = id;
    input.placeholder = placeholder;
    return input;
}

function createLabel(text) {
    const label = document.createElement('label');
    label.textContent = text;
    return label;
}

function createDivWithID(id) {
    const div = document.createElement('div');
    div.id = `Div-${id}`;
    return div;
}

function deleteDiv() {
    const delButton = document.querySelectorAll('.del');
    delButton.forEach(button => {
        button.addEventListener('click',function(){
            const parentDiv = this.parentNode;
            parentDiv.remove();
        });           
    });
}

function moveDivUp() {
    const moveUpButtons = document.querySelectorAll('.move-up');
    moveUpButtons.forEach(button => {
        button.addEventListener('click', function() {
            const inputContainer = this.parentNode;
            console.log('Moving Up', inputContainer);
            const previousSibling = inputContainer.previousElementSibling;
            console.log('previous Sibling', previousSibling);
            if (previousSibling) {
                inputContainer.parentNode.insertBefore(inputContainer, previousSibling);
            }
        });
    });
}

function moveDivDown() {
    const moveDownButtons = document.querySelectorAll('.move-down');
    moveDownButtons.forEach(button => {
        button.addEventListener('click', function() {
            const inputContainer = this.parentNode;
            console.log('Moving Down', inputContainer);
            const nextSibling = inputContainer.nextElementSibling;
            console.log('Next Sibling', nextSibling);
            if (nextSibling) {
                inputContainer.parentNode.insertBefore(nextSibling, inputContainer);
            }
        });
    });
}


function handleCustomTypeChange(option) {
    countDiv.style.display = (option.target.value === 'checkBox' || option.target.value === 'radio') ? 'block' : 'none';
}

function handleSelectedOptionNumChange() {
    countDivInput.innerHTML = '';
    for (let i = 1; i <= countSelect.value; i++) {
        const input = createInput('text', `option${i}`,`option${i}`,'', `Enter option ${i}`);
        const br = document.createElement('br');
        countDivInput.appendChild(input);
        countDivInput.appendChild(br);
    }
}

function addCustomInput() {
    const customInputLabel = document.getElementById('customInputLabel').value;
    const inputContainer = createDivWithID(customInputLabel);    

    if (customTypeSelect.value !== 'submit') {
        const newLabel = createLabel(customInputLabel);
        inputContainer.appendChild(newLabel);
    }

    if (customTypeSelect.value === 'text' || customTypeSelect.value === 'password' || customTypeSelect.value === 'email') {
        const newInput = createInput(customTypeSelect.value, customInputLabel);
        inputContainer.appendChild(newInput);
    } else if (customTypeSelect.value === 'checkBox') {
        for (let i = 1; i <= countSelect.value; i++) {
            const input = createInput(customTypeSelect.value, customInputLabel+i);
            input.value = document.getElementById(`option${i}`).value;
            const label = createLabel(input.value);
            label.setAttribute('for', `option${i}`);
            inputContainer.appendChild(input);
            inputContainer.appendChild(label);
        }
    } else if (customTypeSelect.value === 'radio') {
        for (let i = 1; i <= countSelect.value; i++) {
            const input = createInput(customTypeSelect.value, customInputLabel);
            input.value = document.getElementById(`option${i}`).value;
            const label = createLabel(input.value);
            label.setAttribute('for', `option${i}`);
            inputContainer.appendChild(input);
            inputContainer.appendChild(label);
        }
    } else if (customTypeSelect.value === 'submit') {
        const newInput = createInput('submit', customInputLabel);
        newInput.value = customInputLabel;
        inputContainer.appendChild(newInput);
    }

    const del = document.createElement('button');

    del.className = 'del';

    const moveUp = document.createElement('button');
    moveUp.className = 'move-up';
    moveUp.type = 'button';

    const moveDown = document.createElement('button');
    moveDown.className = 'move-down';
    moveDown.type = 'button';

    inputContainer.appendChild(moveUp);
    inputContainer.appendChild(moveDown);
    inputContainer.appendChild(del);
    dynamicForm.appendChild(inputContainer);

    resetInputFields();
    deleteDiv();
    moveDivUp();
    moveDivDown();
}

customTypeSelect.addEventListener('change', handleCustomTypeChange);
countSelect.addEventListener('change', handleSelectedOptionNumChange);
addInputButton.addEventListener('click', addCustomInput);

function handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(dynamicForm);
    
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    console.log(formObject);

    const jsonData = JSON.stringify(formObject);
    localStorage.setItem('formData', jsonData);
    const storedData = localStorage.getItem('formData');
    const returnedformData = JSON.parse(storedData);
    console.log(returnedformData);   
}

// dynamicForm.addEventListener('submit', handleSubmit);
