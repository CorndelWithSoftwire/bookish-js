

import BookItem from "./book-item.js";
import BookDetails from "./book-details.js";

let bookishApp = new Vue({
    el: '#bookishApp',
    components: {
        BookItem,
        BookDetails
    },
    template: `
    <div>
        <P><input v-model="filter"></P>
        <ol>
            <book-item v-for="book in filteredBookList" 
                      v-bind:book="book" 
                      v-bind:key="book.id"
                      v-on:book-selected="selectBook"
                      >
            </book-item>
        </ol>
        <book-details v-bind:bookDetails="selectedBook" v-on:detailsUpdated="updateBook" ></book-details>
    </div>
    `,
    methods: {
        selectBook : function(clickedBook) {
            this.selectedBook = clickedBook;
        },
        updateBook : function(updatedDetails) {
            console.log("need to update list " + JSON.stringify(updatedDetails) );
            let updateIndex =  this.bookList.findIndex( 
                   ( bookDetails ) => { return bookDetails.id === updatedDetails.id }
            );
            if (updateIndex >= 0 ){
                Object.assign( this.bookList[updateIndex], updatedDetails);
            }
        }
     
    },
    computed: {
        // a computed getter
        filteredBookList: function () {
            // `this` points to the vm instance
            return this.bookList.filter(b => (b.title.includes(this.filter)));
        }

    },
    created: function () {
        console.log("created");
        this.selectedBook = this.bookList[0];
    },
    data() {
        return {
            filter: "",
            selectedBook: { author: "", title: "", isbn: ""},
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
