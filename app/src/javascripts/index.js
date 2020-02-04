document.addEventListener('DOMContentLoaded', () => {
  new Test( '.test__image' ).click();
})

class Test {
  constructor( className ) {
    this.element = document.querySelector( className )
    this.number = 0
    this.element.textContent = this.number
  }
  click() {
    this.element.addEventListener('click', () => {
      this.number++
      this.element.textContent = this.number
    })
  }
}
