document.querySelectorAll('[data-name="tooltip"]').forEach($element => {
  $element.onmouseenter = function() {
    if($element.tooltip) {
      $element.showTooltip()
    }
    else {
      new Tooltip($element)
    }
  }
  $element.onmouseleave = function() {
    $element.hideTooltip()
  }
})

class Tooltip {
  constructor($node) {
    this.$node = $node
    this.$node.tooltip = this
    this.align = $node.dataset.align
    this.text = $node.dataset.text
    this.init()
    this.setRoot()
  }
  init() {
    let $tooltip = document.createElement('div')
    $tooltip.classList.add('tooltip')
    $tooltip.classList.add(this.align)
    $tooltip.innerText = this.text
    this.$tooltip = $tooltip
    this.$node.appendChild(this.$tooltip)
    setTimeout(() => this.show())
  }

  setRoot() {
    this.$node.showTooltip = this.show.bind(this)
    this.$node.hideTooltip = this.hide.bind(this)
  }

  show() {
    this.$tooltip.classList.add('show')
  }

  hide() {
    this.$tooltip.classList.remove('show')
  }
}