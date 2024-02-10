const Colors = {
  HEADER_COLOR: 'secondary',
  FOOTER_COLOR: 'secondary',

  //Icons
  ICON_ADD_COLOR: 'text-success',
  ICON_REFRESH_COLOR: 'text-warning',
  ICON_DELETE_COLOR: 'text-danger',
  ICON_VIEW_COLOR: 'text-primary',
  ICON_EDIT_COLOR: 'text-dark',

  //Table
  TOTAL_BADGE_COLOR: 'warning',

  //Spinner
  LOAD_DATA_SPINNER_COLOR: 'success',

  //Buttons
  SAVE_BUTTON_COLOR: 'success',
  CANCEL_BUTTON_COLOR: 'danger',
}

export default {
  install: (app) => {
    function AppColor(key) {
      return Colors[key]
    }
    app.config.globalProperties.$AppColor = AppColor
    app.provide('AppColor', AppColor)
  },
}
