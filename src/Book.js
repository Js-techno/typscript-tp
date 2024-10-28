"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    constructor(title, author, pages, pagesRead, status, price, format, suggestedBy) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.pagesRead = pagesRead;
        this.status = status;
        this.price = price;
        this.format = format;
        this.suggestedBy = suggestedBy;
        this.finished = pagesRead >= pages; // Automatically mark finished if pages read equals total pages
    }
    // Get the reading progress percentage
    currentlyAt() {
        return (this.pagesRead / this.pages) * 100;
    }
}
exports.Book = Book;
