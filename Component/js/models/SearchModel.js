const data = [
  {
    id: 1,
    name: '[키친르쎌] 홈메이드 칠리소스 포크립 650g',
    image: 'http://young313.com/web/product/big/201903/add21681527a8ddbc2b5d12245dd5c1c.jpg'
  },
  {
    id: 2,
    name: '[키친르쎌] 이탈리아 파티 세트 3~4인분',
    image: 'http://young313.com/web/product/big/201903/6e2527f51f6a9144cd6def6708f3efeb.jpg'
  }
]

export default {
  list(query) {
    return new Promise(res => {
      setTimeout(()=> {
        res(data)
      }, 200);
    })
  }
}