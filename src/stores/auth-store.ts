import { defineStore } from 'pinia'
import { ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from './cart-store'

import initialUsers from '../data/users.json'

export interface User {
    email: string;
    password: string;
    cart: Array<{ id: number; name: string; price: number; quantity: number }>;
}

const users = ref<User[]>([...initialUsers])

function hashPassword(password: string): string {
    return btoa(password)
}

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const savedUser = localStorage.getItem('user')
    const user = ref(savedUser ? JSON.parse(savedUser) : null)

    const isAuthenticated = computed(() => user.value !== null)

    watchEffect(() => {
        if (user.value) {
            localStorage.setItem('user', JSON.stringify(user.value))
        } else {
            localStorage.removeItem('user')
        }
    })

    function login(credentials: { email: string; password: string }) {
        if (!credentials.email || !credentials.password || !credentials.email.trim() || !credentials.password.trim()) {
            alert("Veuillez remplir tous les champs.")
            return
        }

        const hashed = hashPassword(credentials.password)

        const found = users.value.find((currentUser) => {
            return currentUser.email === credentials.email && currentUser.password === hashed
        })
        if (found) {
            user.value = { email: credentials.email }
            console.log("Utilisateur connecté :", credentials.email)
            const cartStore = useCartStore()
            cartStore.loadCartForUser(credentials.email)
            router.push({ name: 'home' })
        } else {
            alert("Identifiants incorrects")
        }
    }

    function signup(data: { email: string; password: string }) {
        if (!data.email || !data.password || !data.email.trim() || !data.password.trim()) {
            alert("Veuillez remplir tous les champs.")
            return
        }

        const exists = users.value.find((currentUser) => {
            return currentUser.email === data.email
        })
        if (exists) {
            alert("Cet email est déjà utilisé")
            return
        }

        const hashed = hashPassword(data.password)

        const newUser: User = { email: data.email, password: hashed, cart: [] }
        users.value.push(newUser)
        console.log("Utilisateur inscrit :", data.email)
        user.value = { email: data.email }

        const cartStore = useCartStore()
        cartStore.loadCartForUser(data.email)
        router.push({ name: 'home' })
    }

    function logout() {
        user.value = null
        
        const cartStore = useCartStore()
        cartStore.clearCart()
        console.log("Utilisateur déconnecté")
        router.push({ name: 'home' })
    }

    return { user, isAuthenticated, login, logout, signup }
})