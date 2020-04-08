import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js'

import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'



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
      
    } else {

    }
    
    ResultView.hide()
    
  },
  
  //데이터 가져오기
  fetchSearchKeyword() {
    KeywordModel.list().then(data => {
      KeywordView.render(data)
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

  onChangeTag() {
    ResultView.show()
  },

  onClickKeyword(keyword) {
    //실제 검색 하기!
    this.search(keyword)
  }
}