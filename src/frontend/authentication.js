const cookieName = 'bookish_access';

function getBookishCookie() {
    return $.cookie(cookieName);
}

function setBookishCookie(token) {
    $.cookie(cookieName, token);
}

function hasToken() {
    const token = getBookishCookie();
    return !!token;
}


function loginUser(form) {
    const username = form.username.value;
    const password = form.password.value;
    $.get(`/login?username=${username}&password=${password}`)
        .done(function(data) {
            setBookishCookie(data.token);
            renderContent();
        })
        .fail(function(error) {
            if (error && error.responseJSON && error.responseJSON.errors.length) {
                $('#error-message').text(error.responseJSON.errors[0]);
            } else {
                $('#error-message').text(error.statusText);
            }
        });
}