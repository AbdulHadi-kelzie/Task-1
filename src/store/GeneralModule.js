/* eslint-disable no-unused-vars */
import * as generalBackend from '../backend/GeneralBackend';
import { NEW_PAGE_STATE, VIEW_PAGE_STATE, EDIT_PAGE_STATE, NEW_ITEM, EDIT_ITEM, DELETE_ITEM, VIEW_ITEM, FIND_ITEM, FIND_ITEMS, CHANGE_ITEM } from '../utils/Constants';
import { PROP_CHANGED, NEW, SAVE, EDIT, FIND, SAVE_SUCCESS, SAVE_FAIL, SAVE_CANCEL, UPDATE, UPDATE_SUCCESS, UPDATE_FAIL, DELETE, DELETE_SUCCESS, DELETE_CANCEL, VIEW, CANCEL, DELETE_FAIL } from '../mutations';

export const generalState = () => {
    return {
        id: null,

        title: '',

        createdBy: '',
        creationDate: '',
        lastModifiedBy: '',
        lastModifiedDate: '',

        searchText: '',
        loading: false,
        saving: false,
        finding: false,
        deleting: false,
        items: [],
        totalPages: 0,
        pageSize: 10,
        total: 0,
        page: 0,
        delModalState: false,
        delTitle: '',
        itemPageState: NEW_PAGE_STATE,
        itemModalState: false,
        selectedItem: {}
    };
};

export const generalMutations = (INITIAL_STATE) => {
    return {
        [PROP_CHANGED](state, payload) {
            console.log('propChanged: ', payload.prop, payload.value);
            state[payload.prop] = JSON.parse(JSON.stringify(payload.value));
        },
        [NEW](state) {
            console.log('onNew: G: ');
            Object.assign(state, INITIAL_STATE);
        },
        [VIEW](state, payload) {
            Object.assign(state, {
                ...payload,
                saving: false,
                finding: false,
                itemPageState: VIEW_PAGE_STATE
            });
        },
        [EDIT](state, payload) {
  Object.assign(state, {
                ...payload,
                saving: false,
                finding: false,
                itemPageState: EDIT_PAGE_STATE
            });
        },
        [FIND](state) {
            Object.assign(state, { finding: true });
        },
        [SAVE](state) {
            Object.assign(state, { saving: true });
        },
        [SAVE_SUCCESS](state) {
            Object.assign(state, INITIAL_STATE);
        },
        [SAVE_CANCEL](state) {
            Object.assign(state, INITIAL_STATE);
        },
        [SAVE_FAIL](state) {
            Object.assign(state, { saving: false });
        },
        [UPDATE](state) {
            Object.assign(state, { loading: true });
        },
        [UPDATE_SUCCESS](state, payload) {
            Object.assign(state, {
                ...payload,
                items: payload.data,
                loading: false,
                page: payload.pageNumber,
                total: payload.totalRecords
            });
        },
        [UPDATE_FAIL](state) {
            state.items = [];
            state.totalPages = 0;
            state.total = 0;
            state.loading = false;
        },
        [DELETE](state, payload) {
            state.deleting = true;
            state.delModalState = true;
            state.id = payload.id;
            state.delTitle = payload.title;
        },
        [DELETE_SUCCESS](state) {
            state.deleting = false;
            state.delModalState = false;
            state.id = null;
            state.delTitle = '';
        },
        [DELETE_FAIL](state) {
            state.deleting = false;
        },
        [DELETE_CANCEL](state) {
            state.deleting = false;
            state.delModalState = false;
            state.id = null;
            state.delTitle = '';
        }
    };
};

export const generalActions = (REST_ENDPOINT) => {
    return {
        async [CHANGE_ITEM]({ state, dispatch, commit, getters, rootGetters }, payload) {
            commit(PROP_CHANGED, payload);
        },
        async [NEW_ITEM]({ state, dispatch, commit, getters, rootGetters }) {
            commit(NEW);
        },
        async [EDIT_ITEM]({ state, dispatch, commit, getters, rootGetters }, payload) {
            commit(EDIT, payload);
        },
        async [VIEW_ITEM]({ state, dispatch, commit, getters, rootGetters }, payload) {
            commit(VIEW, payload);
        },
        async [DELETE_ITEM]({ state, dispatch, commit }) {
            generalBackend.del(commit, dispatch, REST_ENDPOINT(state.id));
        },
        async [FIND_ITEM]({ commit }, payload) {
            commit(FIND);
            generalBackend.findOne(commit, REST_ENDPOINT(payload.id), payload.viewState);
        },
        async [FIND_ITEMS]({ dispatch, commit }, payload) {
            commit(UPDATE);
            if (payload) {
                generalBackend.find(commit, { endpoint: REST_ENDPOINT(), ...payload });
            } else {
                generalBackend.find(commit, { endpoint: REST_ENDPOINT() });
            }
        }
    };
};

export const generalGetters = () => {
    return {};
};
