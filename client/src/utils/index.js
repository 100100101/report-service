const checkedIsType = (value, type) =>
  Object.prototype.toString.call(value) === `[object ${type}]`

export const checkedIsObject = value => checkedIsType(value, 'Object')
