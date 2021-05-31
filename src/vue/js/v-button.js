
let vButton = {
    props: {
        onClick: {
            type: Function,
            required: true
        }
    },

    template: `
    <div>
    <button v-on:click="onClick" class="Button">
      <slot>Button</slot>
    </button>
    </div>
    `
};

export { vButton as default };