import router from '../router/index';
import * as generalBackend from '../backend/GeneralBackend';
const REST_ENDPOINT = () => `users/auth/login`;
import { generalState, generalMutations, generalActions } from './GeneralModule';
import { LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, LOGOUT_USER, LOAD_PROFILE } from '../mutations';
import { LOGIN_ROUTE } from '../utils/Constants';

const INITIAL_STATE = {
    email: '',
    password: '',
    authenticated: false,
    loginError: '',
    logging: false,
    loadingProfile: false,
    currentUser: null,
    fullName: '',
    language: '',
    userRole: '',
    userName: ''
};

const AuthModule = {
    namespaced: true,

    state: () => ({
        ...INITIAL_STATE
    }),

    mutations: {
        ...generalMutations(REST_ENDPOINT),

        [LOGIN_USER](state) {
            Object.assign(state, { logging: true, loginError: '' });
        },
        [LOGIN_USER_SUCCESS](state) {
            Object.assign(state, {
                //currentUser: { ...payload.user },
                authenticated: true,
                loginError: '',
                logging: false,
                //email: '',
                password: ''
            });
        },
        [LOGIN_USER_FAIL](state, payload) {
            Object.assign(state, {
                loginError: 'Authentication Failed: ' + payload,
                authenticated: false,
                logging: false
            });
        },
        [LOGOUT_USER](state) {
            Object.assign(state, {
                logging: false,
                authenticated: false,
                currentUser: null
            });
        },
        [LOAD_PROFILE](state, payload) {
            Object.assign(state, {
                ...payload,
                currentUser: payload
            });
        }
    },
    actions: {
        ...generalActions(REST_ENDPOINT),

        async updateUserInfo({ commit }) {
            commit(LOGIN_USER);
            generalBackend.updateUserInfo(commit);
        },
        async login({ state, dispatch, commit }) {
            commit(LOGIN_USER);
            if (state.email === '' || state.password === '' || state.email.indexOf(' ') >= 0 || state.password.indexOf(' ') >= 0) {
                commit(LOGIN_USER_FAIL);
                commit('sendErrorMessage', 'E-Mail and Password are required!', { root: true });
            } else {
                return generalBackend.login(commit, state.email, state.password, REST_ENDPOINT());
            }
        },
        async logout({ commit }) {
            commit(LOGOUT_USER);
            router.push({ path: LOGIN_ROUTE });
        }
    }
};

export default AuthModule;
