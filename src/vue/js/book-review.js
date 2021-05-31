


let BookReview = {
    props: ['bookDetails'],
    data() {
        return {
            review:{
                reviewText: "",
                rating: 3,
                ageAppropriate: 1,
                publish: false
            }
        }
    },
    methods:{
        saveReview() {
            this.$emit('save-review', this.review);
        }
    },
    template: `
    <div>
        <h1>Review</h1> 
        <p>{{bookDetails.title}} by {{ bookDetails.author }}</p>
        <p style="white-space: pre-line;">Review:
        <textarea v-model="review.reviewText" placeholder="add multiple lines"></textarea>
        </p>
        <p >Rating: 
        <select v-model="review.rating">
            <option disabled value="">Please select one</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
        <p style="white-space: pre-line;">Appropriate age:
            <input type="radio" id="one" value="1" v-model="review.ageAppropriate" />
            <label for="one">Child</label>
            <input type="radio" id="two" value="2" v-model="review.ageAppropriate" />
            <label for="two">Young Adult</label>
            <input type="radio" id="three" value="3" v-model="review.ageAppropriate" />
            <label for="three">Mature</label>
        </p>
        <p style="white-space: pre-line;">Make Review Public:
        <input type="checkbox" id="checkbox" v-model="review.publish" />
        <label for="checkbox">{{ review.publish }}</label>
        </p>
        <button v-on:click="saveReview">Save</button>
    </div>
    `
};

export { BookReview as default };