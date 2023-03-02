"Use Strict";
const bookDisplay = document.querySelector(".book-display");
const btnRemoveBook = [...document.querySelectorAll(".btn-card-remove")];
// const btnCardRead = [...document.querySelectorAll(".btn-card-read")];
const btnClose = document.querySelector(".btn-close");
const btnFormRead = document.querySelector(".btn-form-status");
const overlay = document.querySelector(".overlay");
const newBookForm = document.querySelector("form");
const btnSubmit = document.querySelector(".btn-form-submit");
const btnNew = document.querySelector(".btn-new");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const statusInput = document.querySelector("#status");

btnRemoveBook.forEach(function (btn, i) {
  btn.addEventListener("click", function () {
    document.querySelector(`.card--${i}`).remove();
    myLibrary.splice(i, 1);
  });
});
const myLibrary = [];

const Book = function (title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
};

const harryPotter = new Book("Harry Potter", "J.K Rowling", 365, "false");
myLibrary.push(harryPotter);

const clearInputs = function () {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  btnFormRead.classList.add("read");
  btnFormRead.textContent = "Read";
};

//Book read status form
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
  console.log(titleInput.value !== "");
  console.log(authorInput.value !== "");
  console.log(pagesInput.value !== "");
  console.log(titleInput.value);

  if (
    titleInput.value !== "" &&
    authorInput.value !== "" &&
    pagesInput.value !== ""
  ) {
    //Create newBook from user input
    const newBook = new Book(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      `${btnFormRead.classList.contains("read") ? "true" : "false"}`
    );

    //Add newBook to array
    myLibrary.push(newBook);

    //Display New Book on Page
    bookDisplay.innerHTML = "";
    myLibrary.forEach((book, i) => {
      bookDisplay.insertAdjacentHTML(
        "afterbegin",
        `<div class="card card--${i}">
        <h3 class="card-title">${book.title}</h3>
      <p class="card-author">${book.author}</p>
      <div class="card-pages">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="1 2 22 20">
            <path
            d="M19 2L14 6.5V17.5L19 13V2M6.5 5C4.55 5 2.45 5.4 1 6.5V21.16C1 21.41 1.25 21.66 1.5 21.66C1.6 21.66 1.65 21.59 1.75 21.59C3.1 20.94 5.05 20.5 6.5 20.5C8.45 20.5 10.55 20.9 12 22C13.35 21.15 15.8 20.5 17.5 20.5C19.15 20.5 20.85 20.81 22.25 21.56C22.35 21.61 22.4 21.59 22.5 21.59C22.75 21.59 23 21.34 23 21.09V6.5C22.4 6.05 21.75 5.75 21 5.5V19C19.9 18.65 18.7 18.5 17.5 18.5C15.8 18.5 13.35 19.15 12 20V6.5C10.55 5.4 8.45 5 6.5 5Z"
            /></svg
            ><span>${book.pages}</span>
            </div>
            <div class="card-btns">
            <button class="btn btn-card-read ${
              book.readStatus === "true" ? "Read" : ""
            }" type="button">${
          book.readStatus === "true" ? "Read" : "Not Read"
        }</button>
      <button class="btn btn-card-remove" type="button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="4 3 16 18">
      <path
      d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
      />
          </svg>
          </div>`
      );
    });

    console.log(myLibrary);
    //Change text content read
    const btnCardRead = [
      ...document.querySelectorAll(".btn-card-read"),
    ].reverse();
    btnCardRead.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        myLibrary[i].readStatus === "true"
          ? (myLibrary[i].readStatus = "false")
          : (myLibrary[i].readStatus = "true");
        console.log(myLibrary[i].readStatus);
        btn.classList.toggle("read");
        if (btn.classList.contains("read")) {
          btn.textContent = "Read";
        } else {
          btn.textContent = "Not Read";
        }
      });
    });

    //Add Event Listener
    const btnRemoveBook = [
      ...document.querySelectorAll(".btn-card-remove"),
    ].reverse();

    btnRemoveBook.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        document.querySelector(`.card--${i}`).remove();
        myLibrary.splice(i, 1);
      });
    });

    //Clear input fields
    clearInputs();
    closeModal();
  }
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
btnClose.addEventListener("click", closeModal);

//Change text content read
const btnCardRead = [...document.querySelectorAll(".btn-card-read")].reverse();
btnCardRead.forEach(function (btn, i) {
  btn.addEventListener("click", function () {
    myLibrary[i].readStatus === "true"
      ? (myLibrary[i].readStatus = "false")
      : (myLibrary[i].readStatus = "true");
    console.log(myLibrary[i].readStatus);
    btn.classList.toggle("read");
    if (btn.classList.contains("read")) {
      btn.textContent = "Read";
    } else {
      btn.textContent = "Not Read";
    }
  });
});
