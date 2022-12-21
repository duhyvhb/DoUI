$ = s => document.querySelector(s)
$$ = s => document.querySelectorAll(s)

class Message {
  constructor({type = 'success', text = ''}) {
    this.type = type
    this.text = text
    this.init()
    this.func()
  }
  init() {
    let $message = document.createElement('div')
    let $text = document.createTextNode(this.text)
    let $icon = document.createElement('span')
    $icon.classList.add('iconfont')
    $icon.classList.add(`icon-${this.type}`)
    $message.appendChild($icon)
    $message.appendChild($text)
    $message.classList.add('message')
    $message.classList.add(this.type)
    this.$message = $message
    document.body.appendChild(this.$message)
  }
  show() {
    this.$message.classList.add('active')
  }
  destroy() {
    this.$message.classList.remove('active')
    setTimeout(() => this.$message.parentNode.removeChild(this.$message), 500)
  }
  func() {
    setTimeout(() => this.show())
    setTimeout(() => this.destroy(), 3000)
  }
}

$('.btn-success').addEventListener('click', function() {
  new Message({text: '这是一条成功消息'})
})

$('.btn-warning').addEventListener('click', function() {
  new Message({type: 'warning', text: '这是一条警告消息'})
})

$('.btn-info').addEventListener('click', function() {
  new Message({type: 'info', text: '这是一条提示消息'})
})

$('.btn-error').addEventListener('click', function() {
  new Message({type: 'error', text: '这是一条错误消息'})
})