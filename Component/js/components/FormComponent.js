export default {
    template: '#search-form',
    props: ['value'], //부모한테서 props 가져오기
    data() {
        return {
            inputValue: this.value
        }
    },
    methods: {
        onSubmit() {
            this.$emit('@submit', this.inputValue.trim()) //$emit : 자식 -> 부모
        },
        onKeyup() {
            if(!this.inputValue.length) this.onReset()
        },
        onReset() {
            this.inputValue = ''
            this.$emit('@reset')
        }
    }
}