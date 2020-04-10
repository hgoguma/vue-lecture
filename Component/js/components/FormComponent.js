export default {
    template: '#search-form',
    data() {
        return {
            query: ''
        }
    },
    methods: {
        onSubmit() {
            this.$emit('@submit', this.inputValue.trim()) //$emit : 자식 -> 부모

        },
        onKeyup() {

        },
        onReset() {
            
        }
    }
}