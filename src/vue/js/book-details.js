


let BookDetails = {
    props: ['bookDetails'],
    template: `
    <div v-on:click="say($event)">
    <h1>Details</h1>
    <p v-on:click.stop="displayBio">Author: {{ bookDetails.author }}</p>
    <p>Title:  {{bookDetails.title}}</p>
    </div>
    `,
    methods: {
          say: function(event){
            console.log("Say from "  + event.target.innerHTML);
          },
          displayBio: function(m,e){
            console.log("Biography not avaiable ");
          }
    }       
};

export {BookDetails as default };