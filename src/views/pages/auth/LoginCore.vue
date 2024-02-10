<script>
import { useStore } from 'vuex';
import image from '../../../assets/images/Image.png';
import { Form as vForm, Field, ErrorMessage } from 'vee-validate';
import { AUTH_MODULE as PAGE_MODULE } from '../../../utils/Constants';
import useSingle from '../../../composables/useSingle';

export default {
    name: 'Login',
    components: { Field, vForm, ErrorMessage },
    setup() {
        const store = useStore();

        const onLogin = () => {
            console.log('login...');
            store.dispatch(`${PAGE_MODULE}/login`);
        };

        return {
            ...useSingle(PAGE_MODULE, ''),
            onLogin,
            image
        };
    }
};
</script>

<template>
    <CRow>
        <CCol>
            <CRow class="min-vh-100 align-items-center">
                <CCol xs="2"></CCol>
                <CCol xs="7" class="h-100">
                    <CCard>
                        <CCardBody>
                            <vForm v-slot="{ errors }" as="div" ref="itemForm">
                                <h1 style="color: #ff3951">Sign In</h1>
                                <p class="text-body-secondary">Enter your email and password to sign in!</p>
                                <CCol>
                                    <CInputGroup class="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon="cil-user" />
                                        </CInputGroupText>
                                        <Field name="email" rules="required" as="CFormInput" placeholder="E-mail"
                                            v-model="state.email" :validateOnInput="true"
                                            @input="(e) => onPropChanged(e.target.value, 'email')"
                                            :invalid="errors.email ? true : false"
                                            :valid="state.email == '' || state.email === null ? false : true">
                                        </Field>
                                    </CInputGroup>
                                    <ErrorMessage name="email" />
                                </CCol>
                                <CCol>
                                    <CInputGroup class="mb-4">
                                        <CInputGroupText>
                                            <CIcon icon="cil-lock-locked" />
                                        </CInputGroupText>
                                        <Field name="password" rules="required" as="CFormInput" placeholder="Password"
                                            v-model="state.password" type="password" :validateOnInput="true"
                                            @input="(e) => onPropChanged(e.target.value, 'password')"
                                            :invalid="errors.password ? true : false"
                                            :valid="state.password == '' || state.password === null ? false : true">
                                        </Field>
                                    </CInputGroup>
                                    <ErrorMessage name="password" />
                                </CCol>
                                <CRow>
                                    <CCol :xs="6">
                                        <CFormCheck id="flexCheckChecked" label="Keep me logged in" checked />
                                    </CCol>
                                    <CCol :xs="6" class="text-right">
                                        <CButton color="link" class="px-0" style="color: #ff3951"> Forgot password?
                                        </CButton>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CButton v-if="!state.logging" class="px-4 text-white" @click="onLogin"
                                        style="border-radius: 16px; background-color: #ff3951"> Signin </CButton>
                                    <atom-spinner v-else :size="20" color="primary" />
                                </CRow>
                            </vForm>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs="2"></CCol>
            </CRow>
        </CCol>
        <CCol>
            <img :src="image" />
        </CCol>
    </CRow>
</template>