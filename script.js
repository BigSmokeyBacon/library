"Use Strict";
const bookDisplay = document.querySelector(".book-display");
const overlay = document.querySelector(".overlay");
const newBookForm = document.querySelector("form");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const statusInput = document.querySelector("#status");

const btnNew = document.querySelector(".btn-new");
const btnClose = document.querySelector(".btn-close");
const btnFormRead = document.querySelector(".btn-form-status");
const btnSubmit = document.querySelector(".btn-form-submit");

const myLibrary = [];

const Book = function (title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
};

const powerOfNow = new Book("The Power of Now", "Eckhart Tolle", 236, "true");
const harryPotter = new Book(
  "Harry Potter and the Goblet of Fire",
  "J.K Rowling",
  636,
  "false"
);
const breath = new Book(
  "Breath: The New Science of a Lost Art",
  "James Nestor",
  224,
  "true"
);
const psychopathTest = new Book(
  "The Psychopath Test",
  "Jon Ronson",
  288,
  "true"
);
const heartsInvisibleFuries = new Book(
  "The Heart's Invisible Furies",
  "John Boyne",
  700,
  "false"
);

myLibrary.unshift(powerOfNow);
myLibrary.unshift(harryPotter);
myLibrary.unshift(breath);
myLibrary.unshift(psychopathTest);
myLibrary.unshift(heartsInvisibleFuries);

const clearInputs = function () {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  btnFormRead.classList.add("read");
  btnFormRead.textContent = "Read";
};

const removeCard = function (e) {
  bookDisplay.innerHTML = "";
  myLibrary.splice(e.currentTarget.attributes.index.value, 1);
  myLibrary.forEach(appendCards);
};

const changeCardReadStatus = function (e) {
  myLibrary[e.currentTarget.attributes.index.value].readStatus === "true"
    ? (myLibrary[e.currentTarget.attributes.index.value].readStatus = "false")
    : (myLibrary[e.currentTarget.attributes.index.value].readStatus = "true");
  e.currentTarget.classList.toggle("read");
  if (e.currentTarget.classList.contains("read")) {
    e.currentTarget.textContent = "Read";
  } else {
    e.currentTarget.textContent = "Not Read";
  }
};

const appendCards = function (book, i) {
  const cardEl = document.createElement("div");
  cardEl.classList.add("card", `card--${i}`);

  const titleEl = document.createElement("h3");
  titleEl.classList.add("card-title");
  titleEl.textContent = `${book.title}`;
  cardEl.appendChild(titleEl);

  const authorEl = document.createElement("p");
  authorEl.classList.add("card-author");
  authorEl.textContent = `${book.author}`;
  cardEl.appendChild(authorEl);

  const cardPagesContainerEl = document.createElement("div");
  cardPagesContainerEl.classList.add("card-pages");
  cardEl.appendChild(cardPagesContainerEl);

  const pagesSvgEl = document.createElement("img");
  pagesSvgEl.setAttribute("src", "img/book-open-page-variant.svg");
  pagesSvgEl.setAttribute("alt", "pages logo");
  cardPagesContainerEl.appendChild(pagesSvgEl);

  const numPagesEl = document.createElement("p");
  numPagesEl.textContent = `${book.pages}`;
  cardPagesContainerEl.appendChild(numPagesEl);

  const cardBtnsEl = document.createElement("div");
  cardBtnsEl.classList.add("card-btns");
  cardEl.appendChild(cardBtnsEl);

  const btnCardReadEl = document.createElement("button");
  btnCardReadEl.classList.add(
    "btn",
    "btn-card-read",
    `${book.readStatus === "true" ? "read" : "_"}`
  );
  btnCardReadEl.setAttribute("index", `${i}`);
  btnCardReadEl.textContent = `${
    book.readStatus === "true" ? "Read" : "Not Read"
  }`;
  btnCardReadEl.addEventListener("click", changeCardReadStatus);
  cardBtnsEl.appendChild(btnCardReadEl);

  const btnCardRemoveEl = document.createElement("button");
  btnCardRemoveEl.classList.add("btn", "btn-card-remove");
  btnCardRemoveEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="4 3 16 18">
    <path
    d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
    />`;
  btnCardRemoveEl.setAttribute("index", `${i}`);
  btnCardRemoveEl.addEventListener("click", removeCard);
  cardBtnsEl.appendChild(btnCardRemoveEl);

  bookDisplay.appendChild(cardEl);
};

const toggleModal = function () {
  newBookForm.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

btnNew.addEventListener("click", toggleModal);
btnClose.addEventListener("click", toggleModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !overlay.classList.contains("hidden")) {
    toggleModal();
  }
});
overlay.addEventListener("click", toggleModal);

btnFormRead.addEventListener("click", function () {
  btnFormRead.classList.toggle("read");
  if (btnFormRead.classList.contains("read")) {
    btnFormRead.textContent = "Read";
  } else {
    btnFormRead.textContent = "Not Read";
  }
});

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    titleInput.value !== "" &&
    authorInput.value !== "" &&
    pagesInput.value !== ""
  ) {
    const newBook = new Book(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      `${btnFormRead.classList.contains("read") ? "true" : "false"}`
    );

    myLibrary.unshift(newBook);

    bookDisplay.innerHTML = "";
    myLibrary.forEach(appendCards);

    clearInputs();
    toggleModal();
  }
});

myLibrary.forEach(appendCards);
