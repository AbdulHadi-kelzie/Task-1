/* eslint-disable no-unused-vars */
const REST_ENDPOINT = (id) => `users${id ? '/' + id : ''}`;
import { EDIT_PAGE_STATE, SAVE_ITEM, USERS_ROUTE as PAGE_ROUTE } from '../utils/Constants';
import * as generalBackend from '../backend/GeneralBackend';
import { SAVE, SAVE_FAIL, RESET_PWD, RESET_PWD_FAIL } from '../mutations';
import { generalState, generalMutations, generalActions } from './GeneralModule';

const INITIAL_STATE = {
    ...generalState(),
    email: '',
    userName: '',
    password: '',
    emailConfirmed: false,
    fullName: '',

    hasPhoto: false,
    photoURL: null,
    phoneNumber: '',
    photo: null,
    userRole: 'User',
    language: 'en',

    target: 0,
    isActive: false,
    lockoutEnabled: false,
    lockoutEnd: null,

    appRoles: [],
    appGroups: []
};

const UserModule = {
    namespaced: true,

    state: () => ({
        ...INITIAL_STATE
    }),

    mutations: {
        ...generalMutations(INITIAL_STATE)
    },
    actions: {
        ...generalActions(REST_ENDPOINT),
        async saveItem({ state, dispatch, commit }) {
            commit(SAVE);
            const {
                title,
                createdBy,
                creationDate,
                lastModifiedBy,
                lastModifiedDate,
                searchText,
                loading,
                saving,
                deleting,
                items,
                totalPages,
                pageSize,
                total,
                page,
                delModalState,
                delTitle,
                itemPageState,
                itemModalState,
                selectedItem,
                category,
                assets,
                finding,
                appRoles,
                appGroups,
                ...item
            } = state;

            if (state.id === null) {
                /*if (state.password !== state.rePassword) {
          commit(SAVE_FAIL)
          commit('sendErrorMessage', 'Passwords are not matching!', { root: true })
        } else */
                if (state.email === '' || state.password === '') {
                    commit(SAVE_FAIL);
                    commit('sendErrorMessage', 'Fill all required fields!', { root: true });
                    return;
                } else if (state.email.indexOf(' ') >= 0 || state.password.indexOf(' ') >= 0) {
                    commit(SAVE_FAIL);
                    commit('sendErrorMessage', 'Spaces are not allowed in password!', { root: true });
                } else {
                    if (item.photo) {
                        generalBackend.saveMultipart(commit, dispatch, REST_ENDPOINT(), PAGE_ROUTE(), item, [item.photo]);
                    } else {
                        generalBackend.save(commit, dispatch, REST_ENDPOINT(), PAGE_ROUTE(), item);
                    }
                }
            } else {
                if (item.email === '' || item.email.indexOf(' ') >= 0) {
                    commit(SAVE_FAIL);
                    commit('sendErrorMessage', 'Fill all required fields!', { root: true });
                } else {
                    generalBackend.update(commit, dispatch, REST_ENDPOINT(item.id), PAGE_ROUTE(item.id), item);
                }
            }
        },

        async saveNewPwd({ state, dispatch, commit }) {
            commit(RESET_PWD);
            if (state.userPassword !== state.rePassword) {
                commit(RESET_PWD_FAIL, { message: 'Passwords are not matching' });
                commit('sendErrorMessage', 'Passwords are not matching', { root: true });
            } else if (!state.userPassword || state.userPassword === '') {
                commit(RESET_PWD_FAIL, { message: 'Empty Passwords!' });
                commit('sendErrorMessage', 'Empty Passwords!', { root: true });
            } else if (state.userPassword.indexOf(' ') >= 0) {
                commit(RESET_PWD_FAIL, { message: 'Empty Passwords!' });
                commit('sendErrorMessage', 'Spaces are not allowed in password!', { root: true });
            } else {
                generalBackend.resetPwd(commit, state.id, state.userPassword);
            }
        }
    }
};

export default UserModule;
