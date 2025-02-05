const popupOverlay = document.querySelector(".popup-overlay");
const popupBox = document.querySelector(".popup-box");
const addPopupButton = document.getElementById("add-pop-button");
const cancelPopupButton = document.getElementById("cancel-popup");
const addBookButton = document.getElementById("add-book");
const searchBar = document.getElementById("search-bar");
const bookList = document.getElementById("book-list");
const darkModeToggle = document.querySelector(".dark-mode-toggle");

const bookTitleInput = document.getElementById("book-title-input");
const bookAuthorInput = document.getElementById("book-author-input");
const bookDescriptionInput = document.getElementById("book-description-input");

let books = JSON.parse(localStorage.getItem("books")) || [];

// Display books from localStorage
function displayBooks() {
    bookList.innerHTML = "";
    books.forEach((book, index) => {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book-container");
        bookContainer.innerHTML = `
            <h2>${book.title}</h2>
            <h5>${book.author}</h5>
            <p>${book.description}</p>
            <button onclick="editBook(${index})">✏️ Edit</button>
            <button onclick="deleteBook(${index})">🗑️ Delete</button>
        `;
        bookList.appendChild(bookContainer);
    });
}

// Open popup
addPopupButton.addEventListener("click", () => {
    popupOverlay.style.display = "block";
    popupBox.style.display = "block";
});

// Close popup
cancelPopupButton.addEventListener("click", (event) => {
    event.preventDefault();
    closePopup();
});

function closePopup() {
    popupOverlay.style.display = "none";
    popupBox.style.display = "none";
    clearInputs();
}

// Add new book
addBookButton.addEventListener("click", (event) => {
    event.preventDefault();
    const title = bookTitleInput.value.trim();
    const author = bookAuthorInput.value.trim();
    const description = bookDescriptionInput.value.trim();

    if (title && author && description) {
        books.push({ title, author, description });
        localStorage.setItem("books", JSON.stringify(books));
        displayBooks();
        closePopup();
    } else {
        alert("Please fill out all fields!");
    }
});

// Delete book
function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
}

// Edit book
function editBook(index) {
    const book = books[index];
    bookTitleInput.value = book.title;
    bookAuthorInput.value = book.author;
    bookDescriptionInput.value = book.description;
    deleteBook(index);
    popupOverlay.style.display = "block";
    popupBox.style.display = "block";
}

// Filter books
searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    document.querySelectorAll(".book-container").forEach((container) => {
        const title = container.querySelector("h2").textContent.toLowerCase();
        const author = container.querySelector("h5").textContent.toLowerCase();
        container.style.display = (title.includes(query) || author.includes(query)) ? "block" : "none";
    });
});

// Toggle dark mode
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
    darkModeToggle.textContent = isDarkMode ? "☀️" : "🌙";
});

// Clear input fields
function clearInputs() {
    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    bookDescriptionInput.value = "";
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    displayBooks();
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️";
    }
});
