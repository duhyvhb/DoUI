const $ = s => document.querySelector(s)
class Dialog {
  constructor($root, options = {}) {
    this.$root = $root
    this.onOK = options.onOK || this.onOK
    this.onCancel = options.onCancel || this.onCancel
    this.init()
    this.bind()
  } 
  init() {
    let $close = document.createElement('div')
    $close.classList.add('close')
    this.$root.querySelector('.header').appendChild($close)
    this.$close = $close
    let $footer = document.createElement('div')
    let $btnOK = document.createElement('button')
    let $btnCancel = document.createElement('button')
    $btnOK.innerText = '确定'
    $btnCancel.innerText = '取消'
    $footer.classList.add('footer')
    $btnOK.classList.add('btn')
    $btnOK.classList.add('btn-primary')
    $btnCancel.classList.add('btn')
    $footer.appendChild($btnOK)
    $footer.appendChild($btnCancel)
    this.$root.querySelector('.main').appendChild($footer)
    this.$btnOK = $btnOK
    this.$btnCancel = $btnCancel
  }
  bind() {
    let self = this
    this.$close.onclick = function() {
      self.hide()
      self.onCancel()
    }
    this.$btnCancel.onclick = function() {
      self.hide()
      self.onCancel()
    }
    this.$btnOK.onclick = function() {
      self.hide()
      self.onOK()
    }
  }
  onCancel() {
    console.log('用户点击了取消')
  }
  onOK() {
    this.hide()
    console.log('用户点击了确定')
  }
  show() {
    this.$root.classList.add('active')
    setTimeout(() => {
      this.$root.classList.add('appear')
    })
  }
  hide() {
    this.$root.classList.remove('appear')
    setTimeout(() => {
      this.$root.classList.remove('active')
    }, 400)
  }
}

let $dialog = new Dialog($('.dialog'), {
  onOK() {
    console.log('我点击确定')
  },
  onCancel() {
    console.log('我点击取消')
  }
})
$('#open').addEventListener('click', function(){
  $dialog.show()
})