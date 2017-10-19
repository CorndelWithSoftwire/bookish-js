function getHtmlFromBook(book) {
    return `<li>${book.title} by ${book.author}</li>`;
}

function loadBooks() {
    return $.ajax({url: 'books', headers: {'x-access-token': getBookishCookie()}})
        .done(function(data) {
            return data.books;
        });
}

function loadBooksHtml() {
    return loadBooks().then(function(books) {
        return `<ul>${books.map(getHtmlFromBook).join('')}</ul>`;
    });
}