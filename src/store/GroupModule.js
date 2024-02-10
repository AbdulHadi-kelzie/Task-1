const REST_ENDPOINT = (id) => `groups${id ? '/' + id : ''}`;
import * as generalBackend from '../backend/GeneralBackend';
import { PROP_CHANGED, NEW, SAVE, EDIT, SAVE_SUCCESS, SAVE_FAIL, UPDATE, UPDATE_SUCCESS, UPDATE_FAIL, DELETE, DELETE_SUCCESS, DELETE_CANCEL, VIEW } from '../mutations';
import { NEW_PAGE_STATE, VIEW_PAGE_STATE, EDIT_PAGE_STATE } from '../utils/Constants';

const INITIAL_STATE = {
    id: null,
    name: '',
    description: '',

    appRoles: [],
    loading: false,
    items: [],
    saving: false,
    delModalState: false,
    delTitle: '',

    itemPageState: NEW_PAGE_STATE
};

const GroupModule = {
    namespaced: true,
    state: () => ({
        ...INITIAL_STATE
    }),

    mutations: {
        [PROP_CHANGED](state, payload) {
            state[payload.prop] = payload.value;
        },
        [NEW](state) {
            Object.assign(state, INITIAL_STATE);
        },
        [VIEW](state, payload) {
            Object.assign(state, {
                ...payload,
                saving: false,
                itemPageState: VIEW_PAGE_STATE
            });
        },
        [EDIT](state, payload) {
            Object.assign(state, {
                ...payload,
                saving: false,
                itemPageState: EDIT_PAGE_STATE
            });
        },
        [UPDATE](state) {
            state.loading = true;
        },
        [UPDATE_SUCCESS](state, payload) {
            state.items = payload;
            state.loading = false;
        },
        [UPDATE_FAIL](state) {
            state.items = [];
            state.loading = false;
        },

        [SAVE](state) {
            state.saving = true;
        },
        [SAVE_SUCCESS](state) {
            state = { ...INITIAL_STATE };
        },
        [SAVE_FAIL](state) {
            state.saving = false;
        },
        [DELETE](state, payload) {
            state.delModalState = true;
            state.id = payload.id;
            state.delTitle = payload.title;
        },
        [DELETE_SUCCESS](state) {
            state.delModalState = false;
            state.id = null;
            state.delTitle = '';
        },
        [DELETE_CANCEL](state) {
            state.delModalState = false;
            state.id = null;
            state.delTitle = '';
        }
    },
    actions: {
        async propChanged({ commit }, payload) {
            commit(PROP_CHANGED, payload);
        },
        async findItem({ commit }, payload) {
            generalBackend.findOne(commit, REST_ENDPOINT(payload.id), payload.viewState);
        },
        async findItems({ dispatch, commit }, payload) {
            commit(UPDATE);
            console.log('findGroups');
            generalBackend.find(commit, REST_ENDPOINT(), payload.page, payload.pageSize, payload.sortValue, payload.searchValue);
        }
    }
};

export default GroupModule;
