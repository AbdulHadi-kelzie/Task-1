
<script>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { useStore } from 'vuex';
import image from '@/assets/images/Image.png';
import { Form as vForm, Field, ErrorMessage } from 'vee-validate';
import { AUTH_MODULE as PAGE_MODULE } from '../../../utils/Constants';
import useSingle from '../../../composables/useSingle';

export default {
    name: 'Login',
    components: { Field, vForm, ErrorMessage, AppConfig },
    setup() {
        const { layoutConfig } = useLayout();

        const checked = ref(false);

        const logoUrl = computed(() => {
            return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
            //return `/icons/logo.png`;
        });

        const store = useStore();

        const onLogin = () => {
            console.log('login...');
            store.dispatch(`${PAGE_MODULE}/login`);
        };

        return {
            ...useSingle(PAGE_MODULE, ''),
            onLogin,
            image,
            checked,
            logoUrl
        };
    }
};
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="EVA logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>
                    <vForm v-slot="{ errors }" as="div" ref="itemForm">
                        <div>
                            <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <Field
                                name="email"
                                rules="required"
                                as="InputText"
                                :placeholder="$t('field.email')"
                                v-model="state.email"
                                :validateOnInput="true"
                                class="w-full md:w-30rem mb-5"
                                style="padding: 1rem"
                                @input="(e) => onPropChanged(e.target.value, 'email')"
                                :class="{ 'p-invalid': errors.email ? true : false, 'border-teal-400': state.email == '' || state.email === null ? false : true }"
                                :disabled="state.finding || state.itemPageState == $Constant('VIEW_PAGE_STATE')"
                            >
                            </Field>
                            <ErrorMessage name="email" as="div" class="text-red-600" />
                            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <Field
                                name="password"
                                rules="required"
                                as="Password"
                                :placeholder="$t('field.password')"
                                v-model="state.password"
                                :validateOnInput="true"
                                class="w-full md:w-30rem mb-5"
                                @input="(e) => onPropChanged(e.target.value, 'password')"
                                :toggleMask="true"
                                :class="{ 'p-invalid': errors.password ? true : false, 'border-teal-400': state.password == '' || state.email === null ? false : true }"
                                :disabled="state.finding || state.itemPageState == $Constant('VIEW_PAGE_STATE')"
                            >
                            </Field>
                            <ErrorMessage name="password" as="div" class="text-red-600" />

                            <div class="flex align-items-center justify-content-between mb-5 gap-5">
                                <div class="flex align-items-center">
                                    <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                    <label for="rememberme1">Remember me</label>
                                </div>
                                <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                            </div>
                            <Button label="Sign In" class="w-full p-3 text-xl"></Button>
                        </div>
                    </vForm>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
