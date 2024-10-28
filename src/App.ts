
import { Book, BookStatus, BookFormat } from "./Book.js";  // Add .js extension


const bookForm = document.getElementById("bookForm")! as HTMLFormElement;
const bookList = document.getElementById("bookList")! as HTMLElement;
const totalBooksElement = document.getElementById("totalBooks")! as HTMLElement;
const totalPagesElement = document.getElementById("totalPages")! as HTMLElement;

let books: Book[] = [];

// Load books from local storage
function loadBooks() {
    const storedBooks = localStorage.getItem("books");
    books = storedBooks ? JSON.parse(storedBooks) : [];
    console.log("Loaded books from localStorage:", books);  // nshofou
    displayBooks();
    updateGlobalStats();
}

// Save books to local storage Converts the books array to a JSON string.
function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

// Add a new book
function addBook(book: Book) {
    books.push(book);
    saveBooks();
    displayBooks();
    updateGlobalStats();  // Update stats after adding a book
}

(window as any).deleteBook = (index: number) => {
    books.splice(index, 1);
    saveBooks();
    displayBooks();
    updateGlobalStats();  // Update stats after deleting a book
};


// Display each book and its reading progress
function displayBooks() {
    bookList.innerHTML = "";
    books.forEach((book, index) => {
        const bookElement = document.createElement("div");
        bookElement.className = "p-4 mb-2 border border-gray-300 rounded";
        bookElement.innerHTML = `
            <h2 class="font-bold">${book.title} by ${book.author}</h2>
            <p>Status: ${book.status}, Format: ${book.format}, Price: $${book.price}</p>
            <p>Progress: ${book.currentlyAt().toFixed(2)}%</p>
            <p>Suggested by: ${book.suggestedBy}</p>
            <button onclick="deleteBook(${index})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        `;
        bookList.appendChild(bookElement);
    });
}

// Update global stats for books
function updateGlobalStats() {
    console.log("Books array:", books);  // Debugging statement
    const totalBooks = books.filter(book => book.finished).length;
    const totalPages = books.reduce((sum, book) => sum + book.pagesRead, 0);

    if (totalBooksElement && totalPagesElement) {
        totalBooksElement.textContent = `Total Books Read: ${totalBooks}`;
        totalPagesElement.textContent = `Total Pages Read: ${totalPages}`;
    } else {
        console.error("Global stats elements not found.");
    }
}



// Handle form submission
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const author = (document.getElementById("author") as HTMLInputElement).value;
    const pages = parseInt((document.getElementById("pages") as HTMLInputElement).value);
    const pagesRead = parseInt((document.getElementById("pagesRead") as HTMLInputElement).value);
    const status = (document.getElementById("status") as HTMLSelectElement).value as BookStatus;
    const format = (document.getElementById("format") as HTMLSelectElement).value as BookFormat;
    const price = parseFloat((document.getElementById("price") as HTMLInputElement).value);
    const suggestedBy = (document.getElementById("suggestedBy") as HTMLInputElement).value;

    const newBook = new Book(title, author, pages, pagesRead, status, price, format, suggestedBy);
    addBook(newBook);
    bookForm.reset();
});

// Load books on page load
loadBooks();

// Expose deleteBook function globally for delete button
(window as any).deleteBook = (index: number) => {
    books.splice(index, 1);
    saveBooks();
    displayBooks();
    updateGlobalStats();
};
