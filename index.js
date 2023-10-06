const modalTriggers = document.querySelectorAll('.modal-trigger');
const modalContainer = document.querySelector('.modal-container');
const addButtonModal = document.querySelector('.add-button-modal');
const bookContainer = document.querySelector('.book-container');
const bookForm = modalContainer.querySelector('form');
const editButton = document.querySelectorAll('.edit');
const deleteButton = document.querySelectorAll('.delete');
const editModal = document.querySelector('.edit-modal-container');
const editForm = editModal.querySelector('form');



function deleteBook(event) {
  const id = event.target.dataset.id;
  myLibrary = myLibrary.filter(book => book.id != id);
  saveBook();
  renderBook();
}

modalTriggers.forEach(trigger => trigger.addEventListener('click', toggleModal));
document.querySelectorAll('.edit-modal-trigger').forEach(trigger => trigger.addEventListener('click', toggleModalEdit));

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const description = document.querySelector('#description').value;
  const pages = document.querySelector('#pages').value;
  let read = document.getElementById('read-checkbox');
  const readValue = read.checked
  if (readValue === true) {
    read = 'Yes';
  }else{
    read = 'No';
  }
  const id = myLibrary.length;

  const book = new Book(id, title, author, description, pages, read);

  addBookToLibrary(book);
  
  bookForm.reset();
  toggleModal();
  }
);

editForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const id = event.target.dataset.id;
  const book = myLibrary.find(book => book.id == id);
  const title = editForm.querySelector('#title').value;
  const author = editForm.querySelector('#author').value;
  const description = editForm.querySelector('#description').value;
  const pages = editForm.querySelector('#pages').value;
  let read = editForm.querySelector('#read-checkbox');
  const readValue = read.checked
  if (readValue === true) {
    read = 'Yes';
  }else{
    read = 'No';
  }
  book.title = title;
  book.author = author;
  book.description = description;
  book.pages = pages;
  book.read = read;
  saveBook();
  renderBook();
  toggleModalEdit();
  }
);


function toggleModal() {
  modalContainer.classList.toggle('active');
}

function toggleModalEdit() {
  editModal.classList.toggle('active');
}

let myLibrary = [];

class Book {
  constructor(id, title, author, description, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.pages = pages;
    this.read = read;
  }
}

function renderBook() {
  clearBookElements();
  for (const book of myLibrary) {

    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.setAttribute('data-id', book.id);
    bookElement.innerHTML = `
    <h2 class="book-title">${book.title}</h2>
    <div class="book-author">By ${book.author}</div>
    <div class="book-description">${book.description}</div>
    <div class="book-pages">Pages : ${book.pages}</div>
    <div class="book-read">Read ? : ${book.read}</div>
    <div class="book-actions">
    </div>
    `;
    bookContainer.appendChild(bookElement);
    const bookActions = bookElement.querySelector('.book-actions');
    const editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.classList.add('edit-modal-trigger');
    editButton.setAttribute('data-id', book.id);
    editButton.textContent = 'Edit';
    bookActions.appendChild(editButton);
    editButton.addEventListener('click', (event) => {
      toggleModalEdit();
      const id = event.target.dataset.id;
      const book = myLibrary.find(book => book.id == id);
      editForm.querySelector('#title').value = book.title;
      editForm.querySelector('#author').value = book.author;
      editForm.querySelector('#description').value = book.description;
      editForm.querySelector('#pages').value = book.pages;
      editForm.querySelector('#read-checkbox').checked = book.read;
      editForm.dataset.id = book.id;
  });
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.setAttribute('data-id', book.id);
    deleteButton.textContent = 'Delete';
    bookActions.appendChild(deleteButton);
    deleteButton.addEventListener('click', deleteBook);

  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  saveBook();
  renderBook();
}


function saveBook() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function getBookStorage() {
  JSON.parse(localStorage.getItem('myLibrary'));
}

function loadBook() {
  const savedBooks = localStorage.getItem('myLibrary');
  if (savedBooks) {
    myLibrary = JSON.parse(savedBooks);
    renderBook();
  }
}

function clearBookElements() {
  while (bookContainer.firstChild) {
    bookContainer.removeChild(bookContainer.firstChild);
  }
}

loadBook();

// localStorage.clear();