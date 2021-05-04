
class Book {
    constructor(id, title, author, isbn, copies) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.copies = (!! copies) ? copies : 0; 
    }
}

module.exports =  Book;
