import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import SearchModel from '../models/SearchModel.js'


const tag = '[MainController]'

export default {
  init() {
    console.log(tag, 'init()');
    FormView.setup(document.querySelector('form'))
      .on('@submit', e => this.onSubmit(e.detail.input))
      .on('@reset', e => this.onResetForm())

    ResultView.setup(document.querySelector('#search-result'))
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
  }
}