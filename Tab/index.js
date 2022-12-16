const $ = s => document.querySelector(s)
class Tab {
  constructor($container) {
    this.$container = $container
    this.$tabHeader = $container.querySelector('.tab-header')
    this.$$tabItems = $container.querySelectorAll('.tab-item')
    this.$line = document.createElement('span')
    this.$$tabPanels = $container.querySelectorAll('.tab-panel')
    this.init()
    this.func()
  }
  init() {
    this.$line.classList.add('line')
    this.$line.style.width = this.$container.querySelector('.tab-item.active').offsetWidth + 'px'
    this.$line.style.transform = `translateX(${this.$container.querySelector('.tab-item.active').offsetLeft}px)`
    this.$tabHeader.appendChild(this.$line)
  }
  func() {
    const self = this
    this.$$tabItems.forEach((item, index) => {
      item.addEventListener('click',  function(){
        self.$container.querySelectorAll('.active').forEach((item) => {
          item.classList.remove('active')
        })
        this.classList.add('active')
        self.$line.style.width = this.offsetWidth + 'px'
        self.$line.style.transform = `translateX(${this.offsetLeft}px)`
        self.$$tabPanels[index].classList.add('active')
      })
    })
  }
}

new Tab($('#con1'))
new Tab($('#con2'))