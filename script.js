"Use Strict";
const bookDisplay = document.querySelector(".book-display");
const newBookForm = document.querySelector("form");
const btnSubmit = document.querySelector(".btn-submit");
const btnNew = document.querySelector(".btn-new");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const statusInput = document.querySelector("#status");

const myLibrary = [];

const Book = function (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

Book.prototype.info = function () {
  return `${this.title} ${this.author} ${this.pages} ${this.read}`;
};

// const addBookToLibrary = function (book) {
//   bookDisplay.appendChild(book);
// };

const clearInputs = function () {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  statusInput.value = "";
};

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  //Create newBook from user input
  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    statusInput.value
  );
  //Add newBook to array
  myLibrary.push(newBook);
  //Display New Book on Page
  bookDisplay.innerHTML = "";
  myLibrary.forEach((book, i) => {
    book.divEl = document.createElement("div");
    book.divEl.textContent = book.info();
    book.divEl.setAttribute("index", i);
    bookDisplay.appendChild(book.divEl);
  });
  //Clear input fields
  clearInputs();
});

btnNew.addEventListener("click", function () {
  newBookForm.style.opacity = 100;
});
