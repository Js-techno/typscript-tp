export type BookStatus = "Read" | "Re-read" | "DNF" | "Currently reading" | "Returned Unread" | "Want to read";
export type BookFormat = "Print" | "PDF" | "Ebook" | "AudioBook";

export class Book {
    title: string;
    author: string;
    pages: number;
    pagesRead: number;
    status: BookStatus;
    price: number;
    format: BookFormat;
    suggestedBy: string;
    finished: boolean;

    constructor(
        title: string,
        author: string,
        pages: number,
        pagesRead: number,
        status: BookStatus,
        price: number,
        format: BookFormat,
        suggestedBy: string
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.pagesRead = pagesRead;
        this.status = status;
        this.price = price;
        this.format = format;
        this.suggestedBy = suggestedBy;
        this.finished = pagesRead >= pages;  // Automatically mark finished if pages read equals total pages
    }

    // Get the reading progress percentage
    currentlyAt(): number {
        return (this.pagesRead / this.pages) * 100;
    }
}
