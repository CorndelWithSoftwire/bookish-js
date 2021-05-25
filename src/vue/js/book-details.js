


let BookDetails = {
    props: ['bookDetails'],
    data: function () {
        return {
            activeBookDetails: {
                author: '',
                title: ''
            },
        }
    },
    created: function () {
        // `this` points to the vm instance
        Object.assign(this.activeBookDetails, this.bookDetails);
    },
    template: `
    <div>
    <h1>Details</h1>
    <p>Author: <input v-model="activeBookDetails.author" ></p>
    <p>Title:  <input v-model="activeBookDetails.title"></p>
    </div>
    `
};

export { BookDetails as default };