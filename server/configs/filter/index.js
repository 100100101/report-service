const SEARCH = 'search'
const VALUE_MORE = 'valueMore'
const VALUE_LESS = 'valueLess'
const VALUE_IS = 'valueIs'
const IN_GROUPS = 'inGroups'
const NOT_GROUPS = 'notGroups'
const DATE_LATER = 'dateLater'
const DATE_EARLIER = 'dateEarlier'

const xlsStyles = {
  headerDark: {
    fill: {
      fgColor: {
        rgb: 'FF000000',
      },
    },
    font: {
      color: {
        rgb: 'FFFFFFFF',
      },
      sz: 14,
      bold: true,
      underline: true,
    },
  },
  cellGray: {
    fill: {
      fgColor: {
        rgb: 'CCCCCC',
      },
    },
  },
}

const fields = [
  {
    key: 'car.name',
    name: 'Название объекта',
    width: 180,
    headerStyle: xlsStyles.headerDark,
    cellStyle: xlsStyles.cellGray,
    // cellFormat(value, row) {
    //   return value == 1 ? 'Active' : 'Inactive'
    // },
  },
  {
    key: 'group.name',
    name: 'Группа',
    width: 180,
    headerStyle: xlsStyles.headerDark,
  },
  {
    key: 'carStatus.address',
    name: 'Текущий адрес',
    width: 260,
    headerStyle: xlsStyles.headerDark,
  },
  {
    key: 'carStatus.direction',
    name: 'Направление',
    width: 120,
    headerStyle: xlsStyles.headerDark,
  },
  {
    key: 'carStatus.lastTransferDataDt',
    name: 'Дата последнего выхода',
    width: 120,
    headerStyle: xlsStyles.headerDark,
  },
  {
    key: 'carStatus.mileage',
    name: 'Пробег',
    width: 120,
    headerStyle: xlsStyles.headerDark,
  },
  {
    key: 'carStatus.speed',
    name: 'Скорость',
    width: 120,
    headerStyle: xlsStyles.headerDark,
  },
  {
    key: 'carStatus.active',
    name: 'Активность',
    width: 120,
    headerStyle: xlsStyles.headerDark,
    cellStyle(value, row) {
      return value === true
        ? xlsStyles.cellGreen
        : { fill: { fgColor: { rgb: 'FFFF0000' } } } // <- Inline cell style is possible
    },
  },
  {
    key: 'car.brand',
    name: 'Марка',
    width: 120,
    headerStyle: xlsStyles.headerDark,
  },
  {
    key: 'car.contactPhoneNumber',
    name: 'Контактный номер',
    width: 120,
    headerStyle: xlsStyles.headerDark,
  },
  {
    key: 'car.madeYear',
    name: 'Год выпуска',
    width: 120,
    headerStyle: xlsStyles.headerDark,
  },
  {
    key: 'car.model',
    name: 'Модель',
    width: 120,
    headerStyle: xlsStyles.headerDark,
  },
  {
    key: 'car.ownerFullName',
    name: 'Имя влядельца',
    width: 160,
    headerStyle: xlsStyles.headerDark,
  },
  {
    key: 'car.purchaseDate',
    name: 'Дата покупки',
    width: 150,
    headerStyle: xlsStyles.headerDark,
  },
  {
    key: 'car.registrationNumber',
    name: 'Регистрационный номер',
    width: 120,
    headerStyle: xlsStyles.headerDark,
  },
]
const fieldsByKey = {}

for (const field of fields) {
  const fieldKey = field.key
  const fieldName = field.name
  if (!fieldKey || !fieldName) {
    throw new Error('Missing field key or name')
  }
  field.displayName = fieldName
  fieldsByKey[fieldKey] = field
}

const filterTypes = [
  {
    key: SEARCH,
    name: 'Поиск',
    type: 'string',
    availableFields: [
      'group.name',
      'car.name',
      'car.brand',
      'car.contactPhoneNumber',
      'car.madeYear',
      'car.model',
      'car.ownerFullName',
      'car.purchaseDate',
      'car.registrationNumber',
      'carStatus.mileage',
      'carStatus.speed',
      'carStatus.direction',
      'carStatus.address',
      'carStatus.lastTransferDataDt',
    ],
  },
  {
    key: VALUE_MORE,
    name: 'Значение более чем',
    type: 'number',
    availableFields: [
      'car.madeYear',
      'carStatus.mileage',
      'carStatus.speed',
      'carStatus.direction',
    ],
  },
  {
    key: VALUE_LESS,
    name: 'Значение менее чем',
    type: 'number',
    availableFields: [
      'car.madeYear',
      'carStatus.mileage',
      'carStatus.speed',
      'carStatus.direction',
    ],
  },
  {
    key: VALUE_IS,
    name: 'Значение равно',
    type: 'number',
    availableFields: [
      'car.madeYear',
      'carStatus.mileage',
      'carStatus.speed',
      'carStatus.direction',
    ],
  },
  {
    key: IN_GROUPS,
    name: 'Входит в одну из групп',
    type: 'groups',
  },
  {
    key: NOT_GROUPS,
    name: 'Не входит в список групп',
    type: 'groups',
  },
  {
    key: DATE_LATER,
    name: 'Дата позже чем',
    type: 'date',
    availableFields: [
      'car.madeYear',
      'car.purchaseDate',
      'carStatus.lastTransferDataDt',
    ],
  },
  {
    key: DATE_EARLIER,
    name: 'Дата ранее чем',
    type: 'date',
    availableFields: [
      'car.madeYear',
      'car.purchaseDate',
      'carStatus.lastTransferDataDt',
    ],
  },
]

const filterTypesByKey = filterTypes.reduce((accumulator, filterType) => {
  const filterTypeKey = filterType.key
  if (!filterTypeKey) {
    throw new Error('!filterTypeKey')
  }
  accumulator[filterTypeKey] = filterType
  return accumulator
}, {})

module.exports = {
  filterTypeNames: {
    SEARCH,
    VALUE_MORE,
    VALUE_LESS,
    VALUE_IS,
    IN_GROUPS,
    NOT_GROUPS,
    DATE_LATER,
    DATE_EARLIER,
  },
  fields,
  fieldsByKey,
  filterTypes,
  filterTypesByKey,
}
