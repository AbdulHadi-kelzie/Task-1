<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { reactive, onMounted, computed } from 'vue';
import { Form as vForm, Field, ErrorMessage } from 'vee-validate';
import { AUTH_MODULE as PAGE_MODULE, USERS_ROUTE as PAGE_ROUTE } from '../../utils/Constants';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { SAVE_CANCEL, SAVE } from '../../mutations/index';
import { CHANGE_ITEM, SAVE_ITEM } from '../../utils/Constants';

export default {
    name: 'Profile',
    components: { Field, vForm, ErrorMessage },

    setup() {
        const userRoles = reactive([{ name: 'User' }, { name: 'Admin' }]);
        const availableLocales = reactive([
            { name: 'Arabic', value: 'ar' },
            { name: 'English', value: 'en' }
        ]);
        const store = useStore();
        const router = useRouter();
        //const route = useRoute();
        const { t, locale } = useI18n();
        const state = computed(() => store.state[PAGE_MODULE]);
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
            console.log('Prof.', state.value.currentUser);
            if (!state.value.currentUser) {
                console.log('load profile');
            }
        });
        return {
            userRoles,
            availableLocales,
            onPropChanged,
            onCancel,
            onSave,
            state,
            t,
            locale,
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
                            <Dropdown v-model="state.userRole" :options="userRoles" optionLabel="name" optionValue="name" class="w-full md:w-14rem" @change="(e) => onPropChanged(e.value, 'userRole')"> </Dropdown>
                        </div>
                        <div class="field">
                            <Dropdown v-model="state.language" :options="availableLocales" optionLabel="name" optionValue="value" class="w-full md:w-14rem" @change="(e) => onPropChanged(e.value, 'language')"> </Dropdown>
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
