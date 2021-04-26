

$(document).ready(() => {
    console.log( "bookish ux" );
    $("#add").hide();

    
    $.ajax({url: "books"} ).then(
       (result) => displayTable(result)
    );

    function displayTable(data) {
        var table = $('#bookTable').DataTable({
                "data": data,
                "columns": [
                     {"data": "id", "title": "ISBN"},
                     {"data": "author", "title": "Author"},
                     {"data": "title", "title": "Title"}
                 ],
                "displayStart": 0,
                "bDestroy": true
                });
    }
});

