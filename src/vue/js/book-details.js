


let BookDetails = {
    props: ['bookDetails'],
    data: function () {
        return {
            editing: false,
            
            activeBookDetails: { author: "", title: "" }
        };
    },
    computed: {
        statusMessage(){
            return this.editing? "displayed": "edited";
        }
    },
    created: function () {
        console.log("created");
        this.setMutableState();
    },
    updated: function () {
        console.log("updated");
        // this.setMutableState();
    },
    methods: {
        setMutableState() {
            // property passed by reference, make copy of attributes
            if (!this.editing) {
                Object.assign(this.activeBookDetails, this.bookDetails);
                this. editing = false;
            }
        }
    },
    watch: {
        activeBookDetails : {
           handler(newDetails){
              console.log("W: " + JSON.stringify( newDetails ));
              this.editing = true;
           },
           deep: true
        }
    },
    template: `
    <div>
    <h1>Details</h1>
    <p>Author: <input v-model="activeBookDetails.author" ></p>
    <p>Title:  <input v-model="activeBookDetails.title"></p>
    <p>Status: {{statusMessage}}</p>
    </div>
    `
};

export { BookDetails as default };