const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)
const css = ($node, cssObj) => Object.assign($node.style, cssObj)
const animation = {
  slide($from, $to, direction) {
    $from.style = ''
    $to.style = ''
    css($from, {
      transform: `translateX(0)`,
      zIndex: 1
    })
    css($to, {
      transform: `translateX(${direction === 'right' ? '-' : ''}100%)`,
      zIndex: 2
    })
    setTimeout(() => {
      css($from, {
        transform: `translateX(${direction === 'left' ? '-' : ''}100%)`,
        transition: `all .3s ease`
      })
      css($to, {
        transform: `translateX(0)`,
        transition: `all .3s ease`
      })
    })
  },
  fade($from, $to) {
    $from.style = ''
    $to.style = ''
    css($from, {
      opacity: 1,
      zIndex: 2
    })
    css($to, {
      opacity: 0,
      zIndex: 1
    })
    setTimeout(() => {
      css($from, {
        opacity: 0,
        transition: `all .5s ease`
      })
      css($to, {
        opacity: 1,
        transition: `all .5s ease`
      })
    })
    setTimeout(() => {
      $from.style.zIndex = 1
      $to.style.zIndex = 2
    }, 500)
  },
  zoom($from, $to) {
    $from.style = ''
    $to.style = ''
    css($from, {
      transform: 'scale(1)',
      opacity: 1,
      zIndex: 2
    })
    css($to, {
      opacity: 0,
      zIndex: 1
    })
    setTimeout(() => {
      css($from, {
        transform: 'scale(10)',
        opacity: 0,
        transition: `all .5s ease`
      })
      css($to, {
        opacity: 1,
        transition: `all .5s ease`
      })
    })
    setTimeout(() => {
      $from.style.zIndex = 1
      $to.style.zIndex = 2
    }, 500)
  }
}
class Carousel {
  constructor($root, animation) {
    this.$root = $root
    this.$$a = this.$root.querySelectorAll('a')
    this.num = [...this.$$a].length
    this.animation = animation
    this.init()
    this.bind()
  }
  init() {
    let $pre = document.createElement('button')
    let $next = document.createElement('button')
    let $indicator = document.createElement('ul')
    $pre.classList.add('pre')
    $next.classList.add('next')
    $indicator.classList.add('indicator')
    for(let i = 0; i < this.num; i++) {
      let $li = document.createElement('li')
      $li.style.width = `calc(${100 / this.num}% - 10px)`
      $indicator.appendChild($li)
    }
    this.$root.appendChild($pre)
    this.$root.appendChild($next)
    this.$root.appendChild($indicator)
    this.$pre = $pre
    this.$next = $next
    this.$indicator = $indicator
    this.$$li = this.$indicator.querySelectorAll('li')
    this.$$a[0].classList.add('active')
    this.$$li[0].classList.add('active')
  }
  bind() {
    this.$pre.onclick = this.onPre.bind(this)
    this.$next.onclick = this.onNext.bind(this)
    this.$$li.forEach($item => {
      $item.onclick = this.onLiClicked.bind(this, $item)
    })
  }
  setActive(fromIndex, toIndex, direction = 'left') {
    this.$root.querySelectorAll('.active').forEach($item => {
      $item.classList.remove('active')
    })
    this.$$a[toIndex].classList.add('active')
    this.$$li[toIndex].classList.add('active')
    this.animation(this.$$a[fromIndex], this.$$a[toIndex], direction)
  }
  getPreIndex() {
    let index =  [...this.$$a].indexOf(this.$root.querySelector('.active'))
    return (index - 1 + [...this.$$a].length) % [...this.$$a].length
  }
  getNextIndex() {
    let index =  [...this.$$a].indexOf(this.$root.querySelector('.active'))
    return (index + 1) % [...this.$$a].length
  }
  onPre() {
    let fromIndex = [...this.$$a].indexOf(this.$root.querySelector('.active'))
    let toIndex = this.getPreIndex()
    this.setActive(fromIndex, toIndex, 'right')
    
  }
  onNext() {
    let fromIndex = [...this.$$a].indexOf(this.$root.querySelector('.active'))
    let toIndex = this.getNextIndex()
    this.setActive(fromIndex, toIndex, 'left')
  }
  onLiClicked($item) {
    let fromIndex = [...this.$$a].indexOf(this.$root.querySelector('.active'))
    let toIndex = [...this.$$li].indexOf($item)
    let direction = fromIndex > toIndex ? 'right' : 'left'
    this.setActive(fromIndex, toIndex, direction)
  }
  setAnimation(animation) {
    this.animation = animation
  }
}


let carousel = new Carousel($('#c1'), animation.slide)
$('#styleOpt').addEventListener('change', function() {
  carousel.setAnimation(animation[this.value])
})
