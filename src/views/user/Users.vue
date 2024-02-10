<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { reactive } from 'vue';
import { USER_MODULE as PAGE_MODULE, USERS_ROUTE as PAGE_ROUTE } from '../../utils/Constants';
import useList from '../../composables/useList';

export default {
    name: 'Users',
    setup() {
        const sortFields = reactive([
            { field: 'fullName', order: 1 },
            { field: 'email', order: 1 },
            { field: 'userRole', order: 1 }
        ]);
        return {
            ...useList(PAGE_MODULE, PAGE_ROUTE),
            sortFields
        };
    }
};
</script>
<template>
    <div class="col-12 lg:col-12 xl:col-12">
        <div class="card">
            <DataTable
                :value="items"
                showGridlines
                :rows="10"
                dataKey="id"
                :rowHover="true"
                filterDisplay="menu"
                :loading="loading"
                responsiveLayout="scroll"
                lazy
                paginator
                @sort="sort($event)"
                sortMode="multiple"
                :multiSortMeta="sortFields">
                <template #header>
                    <div class="flex justify-content-between">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText :placeholder="$t('field.search')" @input="(e) => filter(e.target.value)"/>
                        </span>
                        <Button severity="danger" type="button" class="bg-danger rounded" :label="$t('button.addNew')" @click="onNew()" />
                    </div>
                </template>
                <template #empty>{{ $t('message.noItemsFound') }}</template>
                <template #loading>
                    <AtomSpinner />
                </template>
                <Column sortable sortMode="multiple" field="fullName" :header="$t('field.fullName')" />
                <Column sortable sortMode="multiple" field="email" :header="$t('field.email')" />
                <Column sortable field="userRole" :header="$t('field.userRole')">
                    <template #body="{ data }">
                        {{ data.userRole }}
                    </template>
                </Column>
                <Column sortable sortMode="multiple" dataType="boolean" field="active" :header="$t('field.active')">
                    <template #body="{ data }">
                        <i class="pi" :class="{ 'pi-check-circle text-green-500': data.isActive, 'pi-times-circle text-red-400': !data.isActive }"></i>
                    </template>
                </Column>
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
