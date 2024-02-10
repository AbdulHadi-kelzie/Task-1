const REST_ENDPOINT = (id) => `roles${id ? '/' + id : ''}`;
import * as generalBackend from '../backend/GeneralBackend';
import { UPDATE, UPDATE_SUCCESS, UPDATE_FAIL } from '../mutations';

const INITIAL_STATE = {
    loading: false,
    items: []
};

const RoleModule = {
    namespaced: true,

    state: () => ({
        ...INITIAL_STATE
    }),

    mutations: {
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
        }
    },
    actions: {
        async findItems({ dispatch, commit }) {
            commit(UPDATE);
            generalBackend.find(commit, REST_ENDPOINT(), 0, 100);
        }
    }
};

export default RoleModule;
