
import vButton from "./v-button.js"

let BookDetails = {
    props: ['bookDetails'],
    components: {
        vButton
    },
    data: function () {
        return {
            originalBookDetails: { author: "", title: "" },
            activeBookDetails: { author: "", title: "" },
            warningMessage: ""
        };
    },
    computed: {

        statusMessage() {
            return this.isEditing ? "edited" : "displayed";
        },
        isEditing() {
            console.log("isEditing original = " + JSON.stringify(this.originalBookDetails));
            console.log("isEditing active=" + JSON.stringify(this.activeBookDetails));
            return this.compareBooks(this.originalBookDetails, this.activeBookDetails );
        }
    },
    created: function () {
        console.log("created");
        this.warningMessage = "";
        this.setMutableState();
    }, 
    updated: function () {
        console.log("updated");
        if (this.selectionChanged()) {
            if (this.isEditing) {
                this.warningMessage = "save or discard changes";
            } else {
                this.setMutableState();
            }
        } else {
            if (this.isEditing) {
                this.warningMessage = "edited";
            } else {
                this.warningMessage = "";
            }    
        }
    },
    methods: {
        setMutableState() {
            Object.assign(this.originalBookDetails, this.bookDetails);
            Object.assign(this.activeBookDetails, this.bookDetails);
        },
        updateSelected() {
            // record new state, start detecting changes again
            Object.assign(this.originalBookDetails, this.activeBookDetails);
            // notify changes
            this.$emit('detailsUpdated', this.activeBookDetails);
        },
        refreshSelected() {
            // reset, undo all changes. 
            // Note props may have been updated, but I think UI is less confusing
            // to reset to pre-edit state.
            Object.assign(this.activeBookDetails, this.originalBookDetails);
        },
        selectionChanged() {
            // return true if props value different from our copy
            console.log("isEditing original = " + JSON.stringify(this.originalBookDetails));
            console.log("isEditing active=" + JSON.stringify(this.bookDetails));
            return this.compareBooks(this.originalBookDetails, this.bookDetails);
        },
        compareBooks(leftBook, rightBook){
            let changed = false;
            // props bookDetails defines expected schema
            Object.keys(this.bookDetails).forEach(
                (key) => {
                    if (leftBook[key] !== rightBook[key]) {
                        changed = true;
                    }
                }
            );
            return changed;
        }
    },
    template: `
    <div>
    <h1>Details</h1>
    <p>Author: <input v-model="activeBookDetails.author" ></p>
    <p>Title:  <input v-model="activeBookDetails.title"></p>
    <p>Status: {{statusMessage}}</p>
    <p>Warning: {{warningMessage}}</p>
    <p>Editing: {{isEditing}}</p>
    <v-button v-bind:onClick="updateSelected" >Save</v-button>
    <v-button v-bind:onClick="refreshSelected" >Cancel</v-button>
    </div>
    `
};

export { BookDetails as default };