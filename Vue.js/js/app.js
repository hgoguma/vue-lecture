new Vue({
    el: '#app', //vue 인스턴스가 어느 부분에 마운팅 될지 설정
    data : {
        query: '' //입력 데이터 받아서 저장
    },
    methods: {
        onSubmit(e) {
            debugger
        },
        onReset() {
            this.query = ''
            //todo 검색 결과를 숨기기
            debugger
        },
        onKeyup() {
            if(!this.query.length) {
                this.onReset()
            }
        }
    }
})