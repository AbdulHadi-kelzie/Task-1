import { computed, ref, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { formatDateTable } from '../utils/utils';
import { DELETE, DELETE_CANCEL, NEW } from '../mutations/index';
import { DELETE_ITEM, FIND_ITEMS, CHANGE_ITEM } from '../utils/Constants';
import { useI18n } from 'vue-i18n';

export default function useList(PAGE_MODULE, PAGE_ROUTE) {
    const store = useStore();
    const router = useRouter();
    const Constant = inject('Constant');
    const { t } = useI18n();

    //const items = computed(() => store.state[PAGE_MODULE].items)
    //const loading = computed(() => store.state[PAGE_MODULE].loading)
    //const delTitle = computed(() => store.state[PAGE_MODULE].delTitle)
    //const delModalState = computed(() => store.state[PAGE_MODULE].delModalState)
    //const total = computed(() => store.state[PAGE_MODULE].total)

    const page = ref(0);
    const pageSize = ref(0);
    const searchText = ref('');
    const sortText = ref({});

    const sort = (event) => {
        sortText.value = '';
        if (event.multiSortMeta) {
            event.multiSortMeta.forEach((element) => {
                sortText.value += element.order == 1 ? element.field + ',' : `-${element.field},`;
            });
        }
        onFindItems();
    };
    const filter = (value) => {
        searchText.value = value;
        onFindItems();
    };

    const pageChange = (value) => {
        page.value = value;
        onFindItems();
    };

    const paginationChange = (value) => {
        pageSize.value = value;
        onFindItems();
    };

    const onRefresh = () => {
        page.value = 0;
        pageSize.value = Constant('PAGE_SIZE');
        searchText.value = '';
        sortText.value = {};
        onFindItems();
    };

    const onFindItems = () => {
        store.dispatch(`${PAGE_MODULE}/${FIND_ITEMS}`, {
            page: page.value,
            pageSize: pageSize.value,
            sortText: sortText.value,
            searchText: searchText.value
        });
    };

    const onNew = () => {
        store.commit(`${PAGE_MODULE}/${NEW}`);
        router.push(PAGE_ROUTE('n'));
    };

    const onEdit = (id) => {
        store.dispatch(`${PAGE_MODULE}/${CHANGE_ITEM}`, {
            prop: 'itemPageState',
            value: Constant('EDIT_PAGE_STATE')
        });
        router.push(PAGE_ROUTE(id));
    };

    const onView = (id) => {
        store.dispatch(`${PAGE_MODULE}/${CHANGE_ITEM}`, {
            prop: 'itemPageState',
            value: Constant('VIEW_PAGE_STATE')
        });
        router.push(PAGE_ROUTE(id));
    };

    const onDelete = (id, title) => {
        store.commit(`${PAGE_MODULE}/${DELETE}`, {
            id: id,
            title: title
        });
    };

    const onConfirmDelete = () => {
        store.dispatch(`${PAGE_MODULE}/${DELETE_ITEM}`);
    };

    const onCancelDelete = () => {
        store.commit(`${PAGE_MODULE}/${DELETE_CANCEL}`);
    };

    onMounted(() => store.dispatch(`${PAGE_MODULE}/${FIND_ITEMS}`));

    return {
        sort,
        filter,
        paginationChange,
        pageChange,
        onRefresh,
        onEdit,
        onView,
        onFindItems,
        onNew,
        formatDateTable,
        onDelete,
        onCancelDelete,
        onConfirmDelete,
        items: computed(() => store.state[PAGE_MODULE].items),
        loading: computed(() => store.state[PAGE_MODULE].loading),
        delModalState: computed(() => store.state[PAGE_MODULE].delModalState),
        delTitle: computed(() => store.state[PAGE_MODULE].delTitle),
        total: computed(() => store.state[PAGE_MODULE].total),
        t
    };
}
