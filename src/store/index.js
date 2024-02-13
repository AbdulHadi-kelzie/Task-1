import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { useToast } from 'vue-toastification';
import UserModule from './UserModule'
import AuthModule from './AuthModule'
import RoleModule from './RoleModule'
import GroupModule from './GroupModule'
import StoreModule from './StoreModule';
import CategoryModule from './CategoryModule';
import GroceryModule from './GroceryModule';
import {
  AUTH_MODULE,
  GROUP_MODULE, CATEGORY_MODULE,
  ROLE_MODULE, STORE_MODULE, USER_MODULE, GROCERY_MODULE
} from '../utils/Constants';


const toast = useToast();

const mutations = {
    set(state, [variable, value]) {
        state[variable] = value;
    },
    sendErrorMessage(state, message) {
        toast.error(message);
    },
    sendSuccessMessage(state, message) {
        toast.success(message);
    },
    sendInfoMessage(state, message) {
        toast.add({ severity: 'info', summary: 'Info Message', detail: message, life: 3000 });
    },
    sendWarnMessage(state, message) {
        toast.add({ severity: 'warn', summary: 'Info Message', detail: message, life: 3000 });
    },
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
};


export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    theme: 'light',
  },
  mutations: mutations,
  actions: {},
  modules: {
    [AUTH_MODULE]: AuthModule,
    [ROLE_MODULE]: RoleModule,
    [USER_MODULE]: UserModule,
    [STORE_MODULE]: StoreModule,
    [CATEGORY_MODULE]: CategoryModule,
    [GROUP_MODULE]: GroupModule,
    [GROCERY_MODULE]: GroceryModule
},
plugins: [
    createPersistedState({
        reducer: (persistedState) => {
            const AuthModule = { ...persistedState.authModule }; // Persist only one module
            return { [AUTH_MODULE]: AuthModule };
        }
    })
]
})
