import View from './View.js'

const tag = '[TabView]'

const TabView = Object.create(View)

TabView.setup = function(el) {
    console.log('tabview setup')
    this.init(el)
    this.bindClick()
    return this
}

TabView.setActiveTab = function(tabName) {
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.className = li.innerHTML === tabName ?  'active' : ''
    })
    this.show()
}

TabView.bindClick = function() {
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.addEventListener('click', e => this.onClick(li.innerHTML)) //li.innerHTML -> li의 탭이름 넘겨주기
    })
}

TabView.onClick = function(tabName) {
    this.setActiveTab(tabName)
    this.emit('@change', { tabName }) //탭이 변경되었음을 컨트롤러에게 알려주기
}


export default TabView