import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import SignupPage from '../pages/SignupPage.vue'
import CartPage from '../pages/CartPage.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes : [
        {
            path: '',
            name: 'home',
            component: HomePage
        },
        {   
            path: '/login', 
            name: 'login', 
            component: LoginPage
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupPage
        },
        {   
            path: '/cart',
            name: 'cart', 
            component: CartPage,
        }
    ]
})

export default router
