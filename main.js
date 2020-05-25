let $todoInput; // miejsce, gdzie użytkownik wpisuje treść zadania
let $alertInfo; // info o braku zadań / konieczności dodania tekstu
let $addBtn; // przycisk ADD - dodaje nowe elementy do listy
let $ulList; // nasza lista zadań, tagi <ul></ul>
let $newTask; // nowo dodany Li, nowe zadanie
let $popup; //pobrany popup
let $popupInfo; // alert w popupie jak sie doda pusty tekst
let $editedTodo; // edytowany todo
let $popupInput; // tekst wpisywany w inputa w popup'ie
let $addPopupBtn; // przycisk "zatwierdź" w popup'ie
let $closeTodoBtn; //przycisk do zamykania popup'a
let $idNumber = 0;
let $allTasks;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};


const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('lo');
};

const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', enterCheck);
};

const addNewTask = () => {
    if ($todoInput.value !== "") {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $ulList.appendChild($newTask);
        $todoInput.value = "";
        $alertInfo.innerText = "";
        $newTask.setAttribute('id', `toDo ${$idNumber}`);
        createToolsArea();
    } else {
        $alertInfo.innerText = 'Wpisz treść zadania!';
    };
};

const enterCheck = () => {
    if (event.keyCode === 13) {
        addNewTask();
    }
}

const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = 'EDIT';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);
};

//zarządzanie kliknięciami w przyciski
const checkClick = (e) => {
    if (e.target.closest("button").classList.contains("complete")) {
        e.target.closest("li").classList.toggle("completed");
        e.target.closest("button").classList.toggle("completed");
    } else if (e.target.closest("button").className === 'edit') {
        editTask(e);
    } else if (e.target.closest("button").className === 'delete') {
        deleteTask(e);
    }
};

const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;
    $popup.style.display = 'flex';
};

const changeTodo = () => {
    if ($popupInput.value !== "") {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.innerText = '';
    } else {
        $popupInfo.innerText = 'Musisz podać jakąś treść!'
    };
};

const closePopup = () => {
    $popup.style.display = 'none';
    $popupInfo.innerText = '';
};

const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if ($allTasks.length === 0) {
        $alertInfo.innerText = "Brak zadań na liście."
    };
};

document.addEventListener('DOMContentLoaded', main);