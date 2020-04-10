import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js'
import HistoryView from '../views/HistoryView.js'

import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'
import HistoryModel from '../models/HistoryModel.js'



const tag = '[MainController]'

export default {
  init() {
    console.log(tag, 'init()');
    FormView.setup(document.querySelector('form'))
      .on('@submit', e => this.onSubmit(e.detail.input))
      .on('@reset', e => this.onResetForm())
    
    TabView.setup(document.querySelector('#tabs'))
      .on('@change', e => this.onChangeTag(e.detail.tabName))
      
    KeywordView.setup(document.querySelector('#search-keyword'))
      .on('@click', e => this.onClickKeyword(e.detail.keyword))

    HistoryView.setup(document.querySelector('#search-history'))
      .on('@click', e => this.onClickHistory(e.detail.keyword))
      .on('@remove', e => this.onRemoveHistory(e.detail.keyword))

    ResultView.setup(document.querySelector('#search-result'))
    this.selectedTab = '추천 검색어'
    this.renderView()
  },

  renderView() {
    console.log('renderView')
    TabView.setActiveTab(this.selectedTab)

    //현재 탭에 따라서 렌더링 결과 보여주기
    if(this.selectedTab === '추천 검색어') {
      this.fetchSearchKeyword()
      HistoryView.hide()
    } else {
      this.fetchSearchHistory()
      KeywordView.hide()
    }
    ResultView.hide()
  },
  
  //데이터 가져오기
  fetchSearchKeyword() {
    KeywordModel.list().then(data => {
      KeywordView.render(data)
    })
  },

  fetchSearchHistory() {
    HistoryModel.list().then(data => {
      HistoryView.render(data).bindRemoveBtn() //DOM 생성 후 이벤트 바인딩하기!
    })
  },

  search(query) {
    FormView.setValue(query)
    console.log(tag, 'search()', query)
    //search api 
    SearchModel.list(query).then(data => {
      this.onSearchResult(data)
    })
  },

  onSubmit(input) {
    console.log(tag, 'onSubmit()', input)
    //검색 요청
    this.search(input)
  },
  onResetForm() {
    console.log('onResetForm')
    //검색 화면 초기화 하기 (검색 결과 없애기)
    ResultView.hide()
    this.renderView() //원래 있던 tab 다시 렌더링
  },

  onSearchResult(data) {
    TabView.hide()
    KeywordView.hide()
    ResultView.render(data)
  },

  onChangeTag(tabName) {
    this.selectedTab = tabName
    this.renderView()
  },

  onClickKeyword(keyword) {
    //실제 검색 하기!
    this.search(keyword)
  },

  onClickHistory(keyword) {
    this.search(keyword)
  },

  onRemoveHistory(keyword) {
    //실제 데이터 삭제
    HistoryModel.remove(keyword)
    this.renderView() //다시 화면 보여주기
  }
}