import SearchModel from './models/SearchModel.js'

new Vue({
    el: '#app', //vue 인스턴스가 어느 부분에 마운팅 될지 설정
    data : {
        query: '', //입력 데이터 받아서 저장
        submitted: false, //검색 여부
        searchResult: [], //검색 결과
        tabs: ['추천 검색어', '최근 검색어'],
        selectedTab : '',
        keyword: [],
    },
    //created : vue 인스턴스가 생성될 때 호출되는 함수
    created() {
        this.selectedTab = this.tabs[0]
    },
    methods: {
        onSubmit(e) {
            this.search() //검색 호출
        },
        onReset(e) {
            this.resetForm()
        },
        onKeyup() {
            if(!this.query.length) {
                this.onReset()
            }
        },
        search() {
            SearchModel.list().then(data => {
                this.submitted = true 
                this.searchResult = data
            })
        },
        resetForm() {
            this.query = ''
            //todo 검색 결과를 숨기기
            this.submitted = false
            this.searchResult = []
        },
        onClickTab(tab) {
            this.selectedTab = tab
        }
    }
})