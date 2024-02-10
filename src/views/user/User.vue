<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { useStore } from 'vuex';
import { reactive } from 'vue';
import { Form as vForm, Field, ErrorMessage } from 'vee-validate';
import { USER_MODULE as PAGE_MODULE, USERS_ROUTE as PAGE_ROUTE } from '../../utils/Constants';
import useSingle from '../../composables/useSingle';

export default {
    name: 'User',
    components: { Field, vForm, ErrorMessage },

    setup() {
        //const store = useStore();
        //const { onPropChanged, state } = useSingle(PAGE_MODULE, PAGE_ROUTE);
        const userRoles = reactive([{ name: 'User' }, { name: 'Admin' }]);
        return {
            ...useSingle(PAGE_MODULE, PAGE_ROUTE),
            userRoles
            //store
        };
    }
};
</script>
<template>
    <div class="col-12 lg:col-12 xl:col-12">
        <Card>
            <template #content>
                <Button severity="danger" text style="float: right; margin-left: 20px; margin-right: 20px" :label="$t('button.cancel')" class="w-8rem rounded" outlined @click="onCancel"></Button>
                <Button severity="danger" v-if="!state.saving" style="float: right" :label="$t('button.save')" class="w-8rem rounded" @click="onSave" :disabled="state.finding || state.itemPageState == $Constant('VIEW_PAGE_STATE')" />
                <half-circle-spinner v-else style="float: right" class="mr-3 ml-2" :size="30" :color="$getColorHex($AppColor('LOAD_DATA_SPINNER_COLOR'))" />
            </template>
        </Card>
        <Card>
            <template #content>
                <vForm v-slot="{ errors }" as="div" ref="itemForm">
                    <div class="formgroup-inline">
                        <div class="field">
                            <Field
                                name="fullName"
                                rules="required"
                                as="InputText"
                                :placeholder="$t('field.fullName')"
                                v-model="state.fullName"
                                :validateOnInput="true"
                                @input="(e) => onPropChanged(e.target.value, 'fullName')"
                                :disabled="state.finding || state.itemPageState == $Constant('VIEW_PAGE_STATE')"
                            >
                            </Field>
                        </div>
                        <div class="field">
                            <Field
                                name="email"
                                rules="required"
                                as="InputText"
                                :placeholder="$t('field.email')"
                                v-model="state.email"
                                :validateOnInput="true"
                                @input="(e) => onPropChanged(e.target.value, 'email')"
                                :class="{ 'p-invalid': errors.email ? true : false, 'border-teal-400': state.email == '' || state.email === null ? false : true }"
                                :disabled="state.finding || state.itemPageState == $Constant('VIEW_PAGE_STATE')"
                            >
                            </Field>
                            <ErrorMessage name="email" as="div" class="text-red-600" />
                        </div>
                        <div class="field">
                            <Field
                                name="password"
                                rules="required"
                                as="InputText"
                                :placeholder="$t('field.password')"
                                v-model="state.password"
                                :validateOnInput="true"
                                type="password"
                                @input="(e) => onPropChanged(e.target.value, 'password')"
                                :disabled="state.finding || state.itemPageState == $Constant('VIEW_PAGE_STATE')"
                            >
                            </Field>
                        </div>
                        <div class="field">
                            <Dropdown v-model="state.userRole" :options="userRoles" optionLabel="name" optionValue="name" class="w-full md:w-14rem" @change="(e) => onPropChanged(e.value, 'userRole')"> </Dropdown>
                        </div>
                        <div class="field col">
                            <Checkbox v-model="state.isActive" :binary="true" inputId="isActive" @change="onPropChanged($event.target.checked, 'isActive')" :disabled="state.finding || state.itemPageState == $Constant('VIEW_PAGE_STATE')" />
                            <label for="isActive" class="ml-2">{{ $t('field.active') }}</label>
                        </div>
                    </div>
                </vForm>
            </template>
        </Card>
    </div>
</template>
