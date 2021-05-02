# bookish-js

This branch is intended to work towards creating a Vue front-end that uses the bookish REST services running against an mssql database.

The sql folder contains SQL scripts to create and populate the database.

The src folder contains a node application that exposes the REST services and also can be used to service the Vue front-end.

```
    cd src
    npm install
    node index.js
```

You can then GET from these URLs

http://localhost:3000/books
http://localhost:3000/books/34

and browse to 

http://localhost:3000/vue/html/home.html




