import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/stores',
                    name: 'Stores',
                    component: {
                        render() {
                            return h(resolveComponent('router-view'));
                        }
                    },
                    children: [
                        {
                            path: '',
                            meta: {
                                label: 'Stores'
                            },
                            component: () => import('@/views/store/Stores.vue')
                        },
                        {
                            path: ':id',

                            name: 'Store Details',
                            component: () => import('@/views/store/Store.vue')
                        }
                    ]
                },
                {
                    path: '/categories',
                    name: 'Categories',
                    component: {
                        render() {
                            return h(resolveComponent('router-view'));
                        }
                    },
                    children: [
                        {
                            path: '',
                            meta: {
                                label: 'Categories'
                            },
                            component: () => import('@/views/category/Categories.vue')
                        },
                        {
                            path: ':id',

                            name: 'Category Details',
                            component: () => import('@/views/category/Category.vue')
                        }
                    ]
                },
                {
                    path: '/users',
                    component: {
                        render() {
                            return h(resolveComponent('router-view'));
                        }
                    },
                    children: [
                        {
                            path: '',
                            name: 'Users',
                            meta: {
                                label: 'Users'
                            },
                            component: () => import('@/views/user/Users.vue')
                        },
                        {
                            path: ':id',
                            name: 'User Details',
                            component: () => import('@/views/user/User.vue')
                        }
                    ]
                },
                {
                    path: '/profile',
                    name: 'Profile',
                    component: () => import('@/views/user/Profile.vue')
                },
            ]
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
