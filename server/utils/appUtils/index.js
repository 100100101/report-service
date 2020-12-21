module.exports = class {
  constructor() {
    this.checkedIsType = (value, type) =>
      Object.prototype.toString.call(value) === `[object ${type}]`

    this.checkedIsObject = value => this.checkedIsType(value, 'Object')
    this.checkedIsFunction = value => this.checkedIsType(value, 'Function')
  }
}
