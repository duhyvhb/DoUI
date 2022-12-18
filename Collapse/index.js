
class Collapse{
  constructor($container) {
    this.$container = $container
    this.$$items = this.$container.querySelectorAll('.item')
    this.$$headers = this.$container.querySelectorAll('.item-header')
    this.func()
  }
  func() {
    let self = this
    this.$$headers.forEach((header, index) => {
      header.addEventListener('click', function(){
        self.$$items.forEach(item => {
          item.classList.remove('active')
        })
        self.$$items[index].classList.add('active')
      })
    })
  }
}

new Collapse(document.querySelector('.container'))