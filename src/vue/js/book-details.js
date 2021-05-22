


let BookDetails = {
    props: ['bookDetails'],
    template: `
    <div>
    <h1>Details</h1>
    <p>Author: {{ bookDetails.author }}</p>
    <p>Title:  {{bookDetails.title}}</p>
    </div>
    `
};

export {BookDetails as default };