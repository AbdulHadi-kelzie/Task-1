export const JWT_TOKEN = 'B_DC_Jwt_Tkn_102';
export const USER_DATA = 'userData';

//"email": "admin@boulevard.com",
//"password": "Admin=123"

export const PAGE_SIZE = 10;
export const NEW_PAGE_STATE = 0;
export const VIEW_PAGE_STATE = 1;
export const EDIT_PAGE_STATE = 2;
export const NO_PAGE_STATE = 3; // in case there is something else to do//Groups.js an example

export const PRIMARY = '#4638c2';
export const SECONDARY = '#4c4f54';
export const SUCCESS = '#45a164';
export const DANGER = '#d16767';
export const WARNING = '#e1a82d';
export const INFO = '#4799eb';
export const LIGHT = '#20202a';
export const DARK = '#181924';


// task-1
export const GROCERY_MODULE = 'groceryModule'; 
//
export const CATEGORY_MODULE = 'categoryModule';
export const STORE_MODULE = 'storeModule';
export const AUTH_MODULE = 'authModule';
export const GROUP_MODULE = 'groupModule';
export const ROLE_MODULE = 'roleModule';
export const USER_MODULE = 'userModule';

export const FIND_ITEM = 'findItem';
export const FIND_ITEMS = 'findItems';
export const NEW_ITEM = 'newItem';
export const VIEW_ITEM = 'viewItem';
export const EDIT_ITEM = 'editItem';
export const DELETE_ITEM = 'deleteItem';
export const CHANGE_ITEM = 'changeItem';
export const SAVE_ITEM = 'saveItem';

export const TIMESTAMP_FORMAT = 'dddd, MMMM Do YYYY, h:mm:ss a';

//Production
//export const API_DOMAIN = (END_POINT) =>  `/dall/api/v2/${END_POINT}`;

//Locally
//export const API_DOMAIN = (END_POINT) => `http://localhost:7013/api/v1/${END_POINT}`;
export const API_DOMAIN = (END_POINT) => `http://data.boulevard.solutions/api/v1/${END_POINT}`;

//ROUTES
export const USERS_ROUTE = (id) => `/users${id ? '/' + id : ''}`;

export const GROUPS_ROUTE = (id) => `/settings/groups${id ? '/' + id : ''}`;

export const STORES_ROUTE = (id) => `/stores${id ? '/' + id : ''}`;

export const CATEGORIES_ROUTE = (id) => `/categories${id ? '/' + id : ''}`;

//task-1 
export const GROCERIES_ROUTE = (id) => `/groceries${id ? '/' + id : ''}`;

export const LOGIN_ROUTE = '/auth/login';
export const PROFILE_ROUTE = '/profile';

//Icons

export const ASSET_URL = (publicUid) => API_DOMAIN(`assets/${publicUid}`);

export const SETTING_ROUTE = (id) => `/setting${id ? '/' + id : ''}`;
export const APP_NOTIFICATION_ROUTE = (id) => `/appNotifications${id ? '/' + id : ''}`;

export const STA_DEVICES_COUNT = 'STA_DEVICES_COUNT';
export const STA_DEVICES_BY_YEAR = 'STA_DEVICES_BY_YEAR';
export const STA_ITEMS_COUNT = 'STA_ITEMS_COUNT';
export const STA_ITEMS_BY_YEAR = 'STA_ITEMS_BY_YEAR';

export const ROLES = {
    Admin: 'ADMN',
    User: 'USER'
};
