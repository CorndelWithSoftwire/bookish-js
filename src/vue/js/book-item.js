


let BookItem = {
    props: ['book'],
    template: `<li >{{ book.author }}: {{book.title}}</li>`,
};

export {BookItem as default };