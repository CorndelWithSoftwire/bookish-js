

import BookItem from "./book-item.js";
import BookDetails from "./book-details.js";
import BookReview from "./book-review.js";

let bookishApp = new Vue({
    el: '#bookishApp',
    components: {
        BookItem,
        BookDetails,
        BookReview
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

        <book-details v-if="showDetails" v-bind:bookDetails="selectedBook"></book-details>
        <book-review v-if="!showDetails" 
                     v-on:save-review="saveReview"
                     v-bind:bookDetails="selectedBook"></book-review>
    </div>
    `,
    mounted() {
        axios.get("/books").then(
            (response) => { 
                this.bookList = response.data; 
            }
        ).catch(
            (e) => {
                    // TODO: add an error display function, get something on screen while developing
                    this.bookList = [ { author: "none", title: e.message}];
                }
        )
    },
    computed: {
        // a computed getter
        filteredBookList: function () {
            // `this` points to the vm instance
            return this.bookList.filter(b => (b.title.includes(this.filter)));
        }

    },
    methods:{
        selectBook : function(clickedBook) {
            Object.assign( this.selectedBook, clickedBook);
            this.showDetails = !this.showDetails;
        },
        saveReview : function(review){
            console.log( "Review to be saved = " + JSON.stringify( review));
        }

    },
    data() {
        return {
            filter: "",
            showDetails: true,
            showReview: false,
            selectedBook: { author: "", title:"", id: "", isbn: ""},
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
