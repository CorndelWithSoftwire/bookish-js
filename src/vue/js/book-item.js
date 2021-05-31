


let BookItem = {
    props: ['book'],
    template: `<li v-on:click="$emit('book-selected', book )" >{{ book.author }}: {{book.title}}</li>`,
};

export {BookItem as default };


