"Use Strict";
const bookDisplay = document.querySelector(".book-display");
const overlay = document.querySelector(".overlay");
const newBookForm = document.querySelector("form");
const btnSubmit = document.querySelector(".btn-submit");
const btnNew = document.querySelector(".btn-new");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const statusInput = document.querySelector("#status");

const myLibrary = [
  { title: "Harry Potter", author: "J.K. Rowling", pages: 345 },
];

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
    bookDisplay.insertAdjacentHTML(
      "afterbegin",

      `<div class="card card--${i}">
      <div class="card-title">${book.title}</div>
      <div class="card-author">${book.author}</div>
      <div class="card-pages">${book.pages}</div>
      <button class="btn btn-card-read" type="button">Read</button>
      <button class="btn btn-card-remove" type="button">Remove</button>
      <!-- <div class="card-title">J.K. Rowling</div>
      <div class="card-title">J.K. Rowling</div> -->
    </div>`
    );
  });
  //Clear input fields
  clearInputs();
  closeModal();
});

const closeModal = function () {
  newBookForm.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

btnNew.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !overlay.classList.contains("hidden")) {
    closeModal();
  }
});

overlay.addEventListener("click", closeModal);

const createCard = function () {
  const card = document.createElement("div");
  const cardTitle = document.createElement("div");
  const cardAuthor = document.createElement("div");
  const cardPages = document.createElement("div");
  const cardBtnRead = document.createElement("button");
  const cardBtnRemove = document.createElement("button");

  document.appendChild(card);
  document.appendChild(cardTitle);
  document.appendChild(cardAuthor);
  document.appendChild(cardPages);
  document.appendChild(cardBtnRead);
  document.appendChild(cardBtnRemove);
};
