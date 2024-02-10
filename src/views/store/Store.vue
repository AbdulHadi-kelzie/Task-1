<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { onMounted, computed, watch } from 'vue';
import { Form as vForm, Field, ErrorMessage } from 'vee-validate';
import { STORE_MODULE as PAGE_MODULE, STORES_ROUTE as PAGE_ROUTE, CATEGORY_MODULE, FIND_ITEMS } from '../../utils/Constants';
import useSingle from '../../composables/useSingle';

export default {
    name: 'Store',
    components: { Field, vForm, ErrorMessage },

    setup() {
        const { onPropChanged, state, store, onCancel, onSave, t } = useSingle(PAGE_MODULE, PAGE_ROUTE);

        const onRemoveOldAsset = (index) => {
            let deletedAsset = state.value.currentAssets[index];
            let deletedAssets = state.value.assetsIds;
            deletedAssets.push(deletedAsset.id);
            onPropChanged(deletedAssets, 'assetsIds');
            let assetArray = state.value.currentAssets.filter((item) => state.value.currentAssets.indexOf(item) !== index);
            onPropChanged(assetArray, 'currentAssets');
        };
        onMounted(async () => {
            onPropChanged([], 'currentAssets');
            store.dispatch(`${CATEGORY_MODULE}/${FIND_ITEMS}`);
        });
        const imageUrlToBase64 = async (url) => {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((onSuccess, onError) => {
                try {
                    const reader = new FileReader();
                    reader.onload = function () {
                        onSuccess(this.result);
                    };
                    reader.readAsDataURL(blob);
                } catch (e) {
                    onError(e);
                }
            });
        };
        const onRemoveAsset = (file, removeFileCallback, index) => {
            removeFileCallback(index);
            onPropChanged(
                state.value.assets.filter((item) => item !== file),
                'assets'
            );
        };
        const onSelectFiles = (e) => {
            onPropChanged(e.files, 'assets');
        };

        watch(
            () => state.value.originalAssets,
            () => {
                let assetArray = [];
                state.value.originalAssets.forEach(async (it) => {
                    if (it.assetURL) {
                        const blob = await imageUrlToBase64('http://data.boulevard.solutions/' + it.assetURL);
                        state.value.currentAssets.push({
                            id: it.id,
                            image: blob.toString('base64')
                        });
                        onPropChanged(state.value.currentAssets, 'currentAssets');
                        assetArray.push({
                            id: it.id,
                            image: blob.toString('base64')
                        });

                        //console.log("assetArray: ", assetArray.length);
                        //onPropChanged(assetArray, 'currentAssets');
                    }
                });
            }
        );

        return {
            //...useSingle(PAGE_MODULE, PAGE_ROUTE), //using this calls onMounted in useSingle twice
            categories: computed(() => store.state[CATEGORY_MODULE].items),
            loadingCategories: computed(() => store.state[CATEGORY_MODULE].loading),
            state,
            onSave,
            onCancel,
            t,
            onPropChanged,
            onRemoveAsset,
            onRemoveOldAsset,
            onSelectFiles
            //onSelectFiles2
        };
    }
};
</script>
<template>
    <div class="col-12 lg:col-12 xl:col-12">
        <Card>
            <template #content>
                <Button severity="danger" text  style="float: right; margin-left: 20px; margin-right: 20px" :label="$t('button.cancel')" class="w-8rem rounded" outlined @click="onCancel"></Button>
                <Button  severity="danger" v-if="!state.saving" style="float: right" :label="$t('button.save')" class="w-8rem rounded" @click="onSave" :disabled="state.finding || state.itemPageState == $Constant('VIEW_PAGE_STATE')" />
                <half-circle-spinner v-else style="float: right" class="mr-3 ml-2" :size="30" :color="$getColorHex($AppColor('LOAD_DATA_SPINNER_COLOR'))" />
            </template>
        </Card>
        <Card>
            <template #content>
                <vForm v-slot="{ errors }" as="div" ref="itemForm">
                    <div class="formgrid grid">
                        <div class="field col">
                            <Field
                                name="name"
                                rules="required"
                                as="InputText"
                                :placeholder="$t('field.storeName')"
                                v-model="state.name"
                                :validateOnInput="true"
                                @input="(e) => onPropChanged(e.target.value, 'name')"
                                :class="{ 'p-invalid': errors.name ? true : false, 'border-teal-400': state.name == '' || state.name === null ? false : true }"
                                :disabled="state.finding || state.itemPageState == $Constant('VIEW_PAGE_STATE')"
                            >
                            </Field>
                            <ErrorMessage name="name" as="div" class="text-red-600" />
                        </div>
                        <div class="field col">
                            <Field
                                name="latitude"
                                rules="required"
                                as="InputText"
                                :placeholder="$t('field.latitude')"
                                v-model="state.latitude"
                                :validateOnInput="true"
                                @input="(e) => onPropChanged(e.target.value, 'latitude')"
                                :class="{ 'p-invalid': errors.latitude ? true : false, 'border-teal-400': state.latitude == '' || state.latitude === null ? false : true }"
                                :disabled="state.finding || state.itemPageState == $Constant('VIEW_PAGE_STATE')"
                            >
                            </Field>
                            <ErrorMessage name="latitude" as="div" class="text-red-600" />
                        </div>
                        <div class="field col">
                            <Field
                                name="longitude"
                                rules="required"
                                as="InputText"
                                :placeholder="$t('field.longitude')"
                                v-model="state.longitude"
                                :validateOnInput="true"
                                @input="(e) => onPropChanged(e.target.value, 'longitude')"
                                :class="{ 'p-invalid': errors.longitude ? true : false, 'border-teal-400': state.longitude == '' || state.longitude === null ? false : true }"
                                :disabled="state.finding || state.itemPageState == $Constant('VIEW_PAGE_STATE')"
                            >
                            </Field>
                            <ErrorMessage name="longitude" as="div" class="text-red-600" />
                        </div>
                        <div class="field col">
                            <Dropdown
                                v-model="state.categoryId"
                                :options="categories"
                                optionLabel="name"
                                optionValue="id"
                                :placeholder="$t('field.selectCategory')"
                                class="w-full md:w-14rem"
                                :loading="loadingCategories"
                                @change="(e) => onPropChanged(e.value, 'categoryId')"
                            >
                            </Dropdown>
                        </div>
                        <div class="field col">
                            <InputText
                                v-if="state.itemPageState == $Constant('EDIT_PAGE_STATE')"
                                :placeholder="$t('field.collectorNote')"
                                v-model="state.collectorNote"
                                @input="(e) => onPropChanged(e.target.value, 'collectorNote')"
                                :disabled="state.finding || state.itemPageState == $Constant('VIEW_PAGE_STATE')"
                            >
                            </InputText>
                        </div>
                    </div>
                    <div class="field col">
                        <FileUpload name="assets" :multiple="true" accept="image/*" @select="onSelectFiles" :disabled="state.finding || state.itemPageState == $Constant('VIEW_PAGE_STATE')">
                            <template #header="{ chooseCallback, clearCallback }">
                                <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                                    <div class="flex gap-2">
                                        <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined></Button>
                                        <Button
                                            @click="
                                                () => {
                                                    clearCallback();
                                                    onPropChanged([], 'assets');
                                                }
                                            "
                                            icon="pi pi-times"
                                            rounded
                                            outlined
                                            severity="danger"
                                            :disabled="!state.assets || state.assets.length === 0"
                                        ></Button>
                                    </div>
                                </div>
                            </template>
                            <template #content="{ uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                                <div v-if="state.assets.length > 0">
                                    <h5>{{ $t('field.newPhotos') }}</h5>
                                    <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                        <div v-for="(file, index) of state.assets" :key="index" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                            <div>
                                                <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" class="shadow-2" />
                                            </div>
                                            <span class="font-semibold">{{ file.name }}</span>
                                            <Button icon="pi pi-times" @click="onRemoveAsset(file, removeFileCallback, index)" outlined rounded severity="danger" />
                                        </div>
                                    </div>
                                </div>

                                <div v-if="uploadedFiles.length > 0">
                                    <h5>{{ $t('field.new') }}</h5>
                                    <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                        <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                            <div>
                                                <img role="presentation" :alt="file.name" :src="`http://data.boulevard.solutions${file.objectURL}`" width="100" height="50" class="shadow-2" />
                                            </div>
                                            <span class="font-semibold">{{ file.name }}</span>
                                            <Badge value="Completed" class="mt-3" severity="success" />
                                            <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined rounded severity="danger" />
                                        </div>
                                    </div>
                                </div>
                                <div v-if="state.currentAssets.length > 0">
                                    <h5>{{ $t('field.oldPhotos') }}</h5>
                                    <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                        <div v-for="(asset, index) of state.currentAssets" :key="index" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                            <div>
                                                <img role="presentation" alt="" :src="asset.image" width="100" height="50" class="shadow-2" />
                                            </div>
                                            <span class="font-semibold"></span>
                                            <Button icon="pi pi-times" @click="onRemoveOldAsset(index)" outlined rounded severity="danger" />
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #empty>
                                <div class="flex align-items-center justify-content-center flex-column">
                                    <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400" />
                                    <p class="mt-4 mb-0">{{ $t('note.drogDropToUpload') }}</p>
                                </div>
                            </template>
                        </FileUpload>
                    </div>
                </vForm>
            </template>
        </Card>
    </div>
</template>
