import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

import FormComponent from './components/FormComponent.js'

new Vue({
    el: '#app', //vue 인스턴스가 어느 부분에 마운팅 될지 설정
    data : {
        query: '', //입력 데이터 받아서 저장
        submitted: false, //검색 여부
        tabs: ['추천 검색어', '최근 검색어'],
        selectedTab : '',
        keywords: [], //추천 검색어
        history: [], //최근 검색어
        searchResult: [], //검색 결과
    },
    components: {
        'search-form': FormComponent
    },
    //created : vue 인스턴스가 생성될 때 호출되는 함수
    created() {
        this.selectedTab = this.tabs[0]
        this.fetchKeyword()
        this.fetchHistory()
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
            //최근 검색어에 추가하기
            HistoryModel.add(this.query)
            this.fetchHistory()
        },
        resetForm() {
            this.query = ''
            //todo 검색 결과를 숨기기
            this.submitted = false
            this.searchResult = []
        },
        onClickTab(tab) {
            this.selectedTab = tab
        },
        fetchKeyword() { //keyword 가져오기
            KeywordModel.list().then(data => {
                this.keywords = data
            })
        },
        onClickKeyword(keyword) {
            //console.log(keyword)
            this.query = keyword
            this.search(keyword)
        },
        fetchHistory() {
            HistoryModel.list().then(data => {
                this.history = data
            }) 
        },
        onClickRemoveHistory(keyword) {
            HistoryModel.remove(keyword)
            this.fetchHistory()
        },

    }
})