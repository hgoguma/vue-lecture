import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import SearchModel from '../models/SearchModel.js'



const tag = '[MainController]'

export default {
  init() {
    console.log(tag, 'init()');
    FormView.setup(document.querySelector('form'))
      .on('@submit', e => this.onSubmit(e.detail.input))
      .on('@reset', e => this.onResetForm())
    
    TabView.setup(document.querySelector('#tabs'))
      .on('@change', e => this.onChangeTag(e.detail.tabName))
      
    ResultView.setup(document.querySelector('#search-result'))
    this.selectedTab = '추천 검색어'
    this.renderView()
  },

  renderView() {
    console.log('renderView')
    TabView.setActiveTab(this.selectedTab)
    ResultView.hide()
  },

  search(query) {
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
  },
  onSearchResult(data) {
    ResultView.render(data)
  },

  onChangeTag() {
    console.log('onChangeTag')
    ResultView.show()

  }
}