import View from './View.js'

const tag = '[FormView]'

const FormView = Object.create(View)

FormView.setup = function (el) {
    this.init(el)
    this.inputEl = el.querySelector('[type=text]')
    this.resetEl = el.querySelector('[type=reset]')
    this.showResetBtn(false)
    this.bindEvents()
    return this
}

FormView.showResetBtn = function(show = true) {
    this.resetEl.style.display = show ? 'block' : 'none'
}

FormView.bindEvents = function() {
    this.inputEl.addEventListener('keyup', e => this.onKeyup(e))
    this.resetEl.addEventListener('click', e => this.onClickReset(e))
}

FormView.onKeyup = function(e) {
    const enter = 13
    this.showResetBtn(this.inputEl.value.length)
    if(!this.inputEl.value.length) this.emit('@reset')
    if (e.keyCode !== enter) return 
    //todo... 검색 결과를 보여줘야 함 -> formView는 mainController에 엔터키가 입력되었음을 알려줌
    this.emit('@submit', {input: this.inputEl.value})
    
}

FormView.onClickReset = function() {
    this.emit('@reset')
    this.showResetBtn(false)
}

export default FormView