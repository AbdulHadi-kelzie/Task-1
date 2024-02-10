/* eslint-disable no-unused-vars */
import { onMounted, computed, ref, inject } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { formatDateTable } from '../utils/utils';
import { VIEW, EDIT } from '../mutations/index';
import { useI18n } from 'vue-i18n';
import { SAVE_CANCEL, NEW, SAVE } from '../mutations/index';
import { NEW_ITEM, FIND_ITEM, CHANGE_ITEM, SAVE_ITEM } from '../utils/Constants';
import { mapState } from 'vuex';

export default function useSingle(PAGE_MODULE, PAGE_ROUTE) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const Constant = inject('Constant');
    const { t, locale } = useI18n();

    const onPropChanged = (value, prop) => {
        store.dispatch(`${PAGE_MODULE}/${CHANGE_ITEM}`, {
            prop: prop,
            value: value
        });
    };

    const onSave = () => {
        store.commit(`${PAGE_MODULE}/${SAVE}`);
        store.dispatch(`${PAGE_MODULE}/${SAVE_ITEM}`);
    };

    const onCancel = () => {
        store.commit(`${PAGE_MODULE}/${SAVE_CANCEL}`);
        router.push(PAGE_ROUTE());
    };

    onMounted(() => {
        if ((route.params.id && route.params.id != 'n') || !isNaN(route.params.id)) {
            store.dispatch(`${PAGE_MODULE}/${FIND_ITEM}`, {
                id: route.params.id,
                viewState: store.state[PAGE_MODULE].itemPageState === 1 ? VIEW : EDIT
            });
        }
    });

    return {
        onPropChanged,
        onCancel,
        onSave,
        state: computed(() => store.state[PAGE_MODULE]),
        t,
        locale,
        store
    };
}
