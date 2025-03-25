import { defineStore } from 'pinia'
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from './auth-store'

export const useCartStore = defineStore('cart', () => {
    const authStore = useAuthStore()

    type CartItem = { id: number; name: string; price: number; quantity: number }
    const items = ref<CartItem[]>([])

    function loadCartForUser(email: string) {
        const storedCart = localStorage.getItem(`cart_${email}`)
        if (storedCart) {
            items.value = JSON.parse(storedCart)
        } else {
            items.value = []
        }
    }

    function syncCartForUser() {
        if (authStore.user) {
            localStorage.setItem(`cart_${authStore.user.email}`, JSON.stringify(items.value))
        }
    }

    onMounted(() => {
        if (authStore.user) {
            loadCartForUser(authStore.user.email)
        }
        console.log("cart-store monté")
    })

    watch(items, () => {
        syncCartForUser()
    }, { deep: true })

    function addItem(product: { id: number; name: string; price: number }) {
        const existingItem = items.value.find((item) => item.id === product.id)
        if (existingItem) {
            existingItem.quantity++
        } else {
            items.value.push({ ...product, quantity: 1 })
        }
        syncCartForUser()
    }

    function removeItem(productId: number) {
        items.value = items.value.filter((currentItem) => currentItem.id !== productId)
        syncCartForUser()
    }

    function updateQuantity(productId: number, quantity: number) {
        const existingItem = items.value.find((currentItem) => currentItem.id === productId)
        if (existingItem) {
            if (quantity <= 0) {
                removeItem(productId)
            } else {
                existingItem.quantity = quantity
            }
            syncCartForUser()
        }
    }

    function clearCart() {
        items.value = []
        if (authStore.user) {
            localStorage.setItem(`cart_${authStore.user.email}`, JSON.stringify(items.value))
        }
    }

    const totalAmount = computed(() => {
        return items.value.reduce((total, currentItem) => total + currentItem.price * currentItem.quantity, 0)
    })    

    return { items, addItem, removeItem, updateQuantity, clearCart, totalAmount, loadCartForUser }
})
