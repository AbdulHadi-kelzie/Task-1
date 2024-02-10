/* eslint-disable no-unused-vars */
import { SAVE, EDIT, SAVE_FAIL, VIEW } from '../mutations';
import { EDIT_PAGE_STATE, SAVE_ITEM, STORES_ROUTE as PAGE_ROUTE } from '../utils/Constants';
const REST_ENDPOINT = (id, userId) => `stores${id ? '/' + id : ''}${userId ? '/' + userId : ''}`;
import * as generalBackend from '../backend/GeneralBackend';
import { generalState, generalMutations, generalActions } from './GeneralModule';

const INITIAL_STATE = {
    ...generalState(),
    name: '',
    categoryId: null,
    categoryName: '',
    categoryCode: '',
    creationDate: '',
    createdBy: '',
    collectorNote: '',
    isThereANearbyStore: false,
    category: null,
    creatorName: '',

    latitude: '',
    longitude: '',

    assets: [],
    assetsIds: [],
    originalAssets: [],
    currentAssets: []
};

const StoreModule = {
    namespaced: true,

    state: () => ({
        ...INITIAL_STATE
    }),

    mutations: {
        ...generalMutations(INITIAL_STATE),
        [EDIT](state, payload) {
            console.log('onEdit: S:', payload);
            Object.assign(state, {
                ...payload,
                finding: false,
                assets: [],
                saving: false,
                itemPageState: EDIT_PAGE_STATE,
                originalAssets: payload.assets,
                assetsIds: []
            });
        }
    },
    actions: {
        ...generalActions(REST_ENDPOINT),
        async [SAVE_ITEM]({ state, dispatch, commit }) {
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
                currentAssets,
                originalAssets,
                category,
                //assets,
                //assetsIds,
                finding,
                ...item
            } = state;

            if (item.name == '') {
                commit(SAVE_FAIL);
                commit('sendErrorMessage', 'Name is required!', { root: true });
                return;
            }
            if (item.categoryId == null) {
                commit(SAVE_FAIL);
                commit('sendErrorMessage', 'Category is required!', { root: true });
                return;
            }
            if (item.id === null) {
                if (!state.assets || !state.assets.length > 0) {
                    commit(SAVE_FAIL);
                    commit('sendErrorMessage', 'You need at least one photo!', { root: true });
                    return;
                }
                generalBackend.saveMultipart(commit, dispatch, REST_ENDPOINT(), PAGE_ROUTE(), item, state.assets);
            } else {
                if (state.originalAssets && state.originalAssets.length >= state.assetsIds.length && state.assets.length == 0) {
                    commit(SAVE_FAIL);
                    commit('sendErrorMessage', 'You need at least one photo!', { root: true });
                    return;
                }
                item.newAssets = item.assets;
                generalBackend.updateMultipart(commit, dispatch, REST_ENDPOINT(item.id), PAGE_ROUTE(), item, state.assets);
            }
        }
    },

    getters: {}
};

export default StoreModule;
