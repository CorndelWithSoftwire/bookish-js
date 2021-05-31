


let BookReview = {
    props: ['bookDetails'],
    data(){
        return {
            reviewText: "",
            rating: 3,
            ageAppropriate : 1
        }
    },
    template: `
    <div>
    <h1>Review</h1> 
    <p>{{bookDetails.title}} by {{ bookDetails.author }}</p>
    <p style="white-space: pre-line;">Review:</p>
    <textarea v-model="reviewText" placeholder="add multiple lines"></textarea>
    </div>
    `
};

export {BookReview as default };