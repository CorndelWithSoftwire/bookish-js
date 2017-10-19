function renderLoginPage() {
    $('#content').load('login.html');
}

function renderContent() {
    if (hasToken()) {
        loadBooksHtml().then(function(books) {
            $('#content').html(books);
        });
    } else {
        renderLoginPage();
    }
}

$(document).ready(function() {
    renderContent();
});