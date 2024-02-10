/* eslint-disable no-unused-vars */
import { SAVE, EDIT, SAVE_FAIL, VIEW } from '../mutations';
import { CATEGORIES_ROUTE as PAGE_ROUTE } from '../utils/Constants';
const REST_ENDPOINT = (id) => `categories${id ? '/' + id : ''}`;
import * as generalBackend from '../backend/GeneralBackend';
import { generalState, generalMutations, generalActions } from './GeneralModule';

const INITIAL_STATE = {
    ...generalState(),
    name: '',
    code: ''
};

const CategoryModule = {
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
                finding,
                ...item
            } = state;

            if (item.name == '') {
                commit(SAVE_FAIL);
                commit('sendErrorMessage', 'Name is required!', { root: true });
                return;
            }
            console.log('item: ', item);
            if (item.id === null) {
                generalBackend.save(commit, dispatch, REST_ENDPOINT(), PAGE_ROUTE(), item);
            } else {
                generalBackend.update(commit, dispatch, REST_ENDPOINT(item.id), PAGE_ROUTE(), item);
            }
        }
    },

    getters: {}
};

export default CategoryModule;
