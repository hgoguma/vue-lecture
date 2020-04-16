<template>
  <div>
    <header>
      <h2 class="container">검색</h2>
    </header>
    <div class="container">
      <search-form v-bind:value="query" v-on:@submit="onSubmit" v-on:@reset="onReset"></search-form>
    </div>
    <div class="content">
      <!--검색 결과-->
      <div v-if="submitted">
        <search-result v-bind:data="searchResult" v-bind:query="query"></search-result> 
      </div>
      <!--tab-->
      <div v-else>
        <tabs v-bind:tabs="tabs" v-bind:selected-tab="selectedTab" v-on:@change="onClickTab"></tabs>
        <div v-if="selectedTab === tabs[0]">
          <list v-bind:data="keywords" type="keywords" v-on:@click="onClickKeyword"></list>
        </div>
        <div v-else>
          <list v-bind:data="history" type="history" 
                v-on:@click="onClickKeyword" v-on:@remove="onClickRemoveHistory" ></list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormComponent from './components/FormComponent.vue'
import ListComponent from './components/ListComponent.vue'
import ResultComponent from './components/ResultComponent.vue'
import TabComponent from './components/TabComponent.vue'

import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'


export default {
  name: 'app',
  data () {
    return {
      query: '', //입력 데이터 받아서 저장
      submitted: false, //검색 여부
      tabs: ['추천 검색어', '최근 검색어'],
      selectedTab : '',
      keywords: [], //추천 검색어
      history: [], //최근 검색어
      searchResult: [], //검색 결과
    }
  },
  components: {
    'search-form' : FormComponent,
    'search-result' : ResultComponent,
    'list' : ListComponent,
    'tabs' : TabComponent,
  },
  created() {
    this.selectedTab = this.tabs[0]
    this.fetchKeyword()
    this.fetchHistory()
  },
  methods: {
    onSubmit(query) {
        this.query = query //자식 컴포넌트에서 받아온 값으로 셋팅
        this.search() //검색 호출
    },
    onReset(e) {
        this.resetForm()
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
}
</script>