

import BookItem from "./book-item.js";

let bookishApp = new Vue({
    el: '#bookishApp',
    components : {
        BookItem
    },
    template : `
    <div>
        <P><input v-model="filter"></P>
        <ol>
            <book-item v-for="item in filteredBookList" v-bind:book="item" v-bind:key="item.id"></book-item>
        </ol>
    </div>
    `,
    created: function () {
        // `this` points to the vm instance
        console.log('book[0] is: ' + this.bookList[0].title);
    },
    computed: {
        // a computed getter
        filteredBookList: function () {
            // `this` points to the vm instance
            return this.bookList.filter(b => (b.title.includes(this.filter)));
        }
    },
    data: function() { 
        return {
        filter: "",
        bookList: [{
            "id": 15,
            "title": "Build Your Own Database Driven Website Using PHP and MySQL",
            "author": "Kevin Yank ",
            "isbn": "              ",
            "copies": 0
        },
        {
            "id": 16,
            "title": "Peer Reviews in Software",
            "author": "Karl Wiegers",
            "isbn": "              ",
            "copies": 0
        },
        {
            "id": 17,
            "title": "Perl in a Nutshell (1st ed)",
            "author": "Ellen Siever, Stephen Spainhour, Nathan Patwardhan",
            "isbn": "NULL          ",
            "copies": 0
        }, {
            "id": 19,
            "title": "Growing object-oriented software, guided by tests",
            "author": " Steve Freeman",
            "isbn": "321503627     ",
            "copies": 0
        },
        {
            "id": 20,
            "title": "Data Protection & PCI Compliance for Dummies",
            "author": "Richard Moulds",
            "isbn": "NULL          ",
            "copies": 0
        },
        {
            "id": 21,
            "title": "Foundations of F# (Expert's Voice in .Net)",
            "author": "Robert. Pickering",
            "isbn": "1590597575    ",
            "copies": 0
        },
        {
            "id": 22,
            "title": "Microsoft Project 2013 ",
            "author": "Ben Howard",
            "isbn": "              ",
            "copies": 0
        },
        {
            "id": 23,
            "title": "Continuous Delivery",
            "author": "Jez Humble",
            "isbn": "321601912     ",
            "copies": 0
        },
        {
            "id": 24,
            "title": "Agile product management with Scrum",
            "author": " Roman Pichler",
            "isbn": "321605780     ",
            "copies": 0
        }

        ]
        }
    }
}
)



export { bookishApp as default };
