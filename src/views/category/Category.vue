<script>
import { useStore } from 'vuex';
import { Form as vForm, Field, ErrorMessage } from 'vee-validate';
import { CATEGORY_MODULE as PAGE_MODULE, CATEGORIES_ROUTE as PAGE_ROUTE } from '../../utils/Constants';
import useSingle from '../../composables/useSingle';

export default {
    name: 'Category',
    components: { Field, vForm, ErrorMessage },

    setup() {
        const store = useStore();
        return {
            ...useSingle(PAGE_MODULE, PAGE_ROUTE),
            store
        };
    }
};
</script>
<template>
    <div class="col-12 lg:col-12 xl:col-12">
        <Card>
            <template #content>
                <Button severity="danger" text style="float: right; margin-left: 20px; margin-right: 20px" :label="$t('button.cancel')" class="w-8rem rounded" outlined @click="onCancel"></Button>
                <Button
                    severity="danger"
                    v-if="!state.saving || !state.finding"
                    style="float: right"
                    :label="$t('button.save')"
                    class="w-8rem bg-danger rounded"
                    @click="onSave"
                    :disabled="state.finding || state.itemPageState == $Constant('VIEW_PAGE_STATE')"
                />
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
                                :placeholder="$t('field.categoryName')"
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
                                name="code"
                                rules="required"
                                as="InputText"
                                :placeholder="$t('field.code')"
                                v-model="state.code"
                                :validateOnInput="true"
                                @input="(e) => onPropChanged(e.target.value, 'code')"
                                :class="{ 'p-invalid': errors.code ? true : false, 'border-teal-400': state.code == '' || state.code === null ? false : true }"
                                :disabled="state.finding || state.itemPageState == $Constant('VIEW_PAGE_STATE')"
                            >
                            </Field>
                            <ErrorMessage name="code" as="div" class="text-red-600" />
                        </div>
                    </div>
                </vForm>
            </template>
        </Card>
    </div>
</template>
