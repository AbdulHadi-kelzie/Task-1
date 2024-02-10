<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { useStore } from 'vuex';
import { reactive } from 'vue';
import { STORE_MODULE as PAGE_MODULE, STORES_ROUTE as PAGE_ROUTE } from '../../utils/Constants';
import useList from '../../composables/useList';

export default {
    name: 'Stores',
    setup() {
        const store = useStore();
        const sortFields = reactive([
            { field: 'name', order: 1 },
            { field: 'categoryName', order: 1 },
            { field: 'creatorName', order: 1 },
            { field: 'creationDate', order: 1 },
            { field: 'collectorNote', order: 1 }
        ]);
        const openMap = (data) => {
            window.open(`https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`, '_blank');
        };
        return {
            ...useList(PAGE_MODULE, PAGE_ROUTE),
            store,
            sortFields,
            openMap
        };
    }
};
</script>
<template>
    <div class="col-12 lg:col-12 xl:col-12">
        <div class="card">
            <DataTable :value="items" showGridlines :rows="10" dataKey="id" :rowHover="true" filterDisplay="menu" :loading="loading" responsiveLayout="scroll" lazy paginator @sort="sort($event)" sortMode="multiple" :multiSortMeta="sortFields">
                <template #header>
                    <div class="flex justify-content-between">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText :placeholder="$t('field.search')" @input="(e) => filter(e.target.value)" />
                        </span>
                        <Button type="button" severity="danger" :label="$t('button.addNew')" @click="onNew()" target="_self" />
                    </div>
                </template>
                <template #empty>{{ $t('message.noItemsFound') }}</template>
                <template #loading>
                    <AtomSpinner />
                </template>
                <Column sortable sortMode="multiple" field="name" :header="$t('field.name')">
                    <template #body="{ data }">
                        {{ data.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" @keydown.enter="filter('name', filterModel)" type="text" class="p-column-filter" placeholder="Search by name" />
                    </template>
                </Column>
                <Column sortable sortMode="multiple" field="categoryName" :header="$t('field.categoryName')" />
                <Column  field="location" :header="$t('field.location')">
                    <template #body="{ data }">
                        <Button icon="pi pi-map" severity="danger" text rounded aria-label="map" @click="openMap(data)" />
                    </template>
                </Column>
                <Column sortable sortMode="multiple" field="creatorName" :header="$t('field.creationUser')" />
                <Column sortable sortMode="multiple" field="creationDate" header="Creation Time&Date">
                    <template #body="{ data }">
                        {{ formatDateTable(data.creationDate) }}
                    </template>
                </Column>
                <Column sortable sortMode="multiple" field="collectorNote" :header="$t('field.collectorNote')" />
                <Column field="actions" header="Actions">
                    <template #body="{ data }">
                        <Button severity="danger" class="p-button-rounded bg-danger mr-2 mb-2" @click="onEdit(data.id)"> <i class="fa-solid fa-pen"></i> {{ $t('button.edit') }} </Button>
                        <Button severity="danger" class="p-button-rounded bg-danger mr-2 mb-2" @click="onDelete(data.id, data.name)"> <i class="fa-solid fa-pen"></i> {{ $t('button.delete') }} </Button>
                    </template>
                </Column>
            </DataTable>
            <Paginator :rows="10" :totalRecords="total" template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" currentPageReportTemplate="{first}  to  {last}  of  {totalRecords}" @page="pageChange" />
        </div>
        <ConfirmDialog v-model:visible="delModalState">
            <template #container>
                <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
                    <div class="border-circle bg-danger inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                        <i class="pi pi-question text-5xl"></i>
                    </div>
                    <span class="font-bold text-2xl block mb-2 mt-4">{{ $t('message.confirmDelete') }}</span>
                    <p class="mb-0">{{ $t('message.deleteMessage', { title: delTitle }) }}</p>
                    <div class="flex align-items-center gap-2 mt-4">
                        <Button severity="danger" :label="$t('button.yes')" class="w-8rem bg-danger" @click="onConfirmDelete()"></Button>
                        <Button severity="danger" text :label="$t('button.no')" outlined class="w-8rem" @click="onCancelDelete()"></Button>
                    </div>
                </div>
            </template>
        </ConfirmDialog>
    </div>
</template>
