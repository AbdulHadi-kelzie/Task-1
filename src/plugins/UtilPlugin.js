export default {
  install: (app) => {
    function getColorHex(color) {
      switch (color) {
        case 'primary':
          return '#4638c2'
        case 'secondary':
          return '#4c4f54'
        case 'success':
          return '#45a164'
        case 'danger':
          return '#d16767'
        case 'warning':
          return '#e1a82d'
        case 'info':
          return '#4799eb'
        case 'dark':
          return '#181924'
        case 'light':
          return '#20202a'
      }
    }

    function checkSortValue(sortValue) {
      if (sortValue && sortValue.column && sortValue.column != '') {
        return `${sortValue.column},${sortValue.asc === false ? 'DESC' : 'ASC'}`
      } else {
        return undefined
      }
    }
    app.config.globalProperties.$getColorHex = getColorHex
    app.provide('getColorHex', getColorHex)

    app.config.globalProperties.$checkSortValue = checkSortValue
    app.provide('checkSortValue', checkSortValue)
  },
}
