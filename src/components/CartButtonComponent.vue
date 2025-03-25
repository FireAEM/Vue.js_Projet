<template>
    <ButtonComponent :data="buttonData" @click="goToCart" />
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import { useCartStore } from '../stores/cart-store'
    import { useAuthStore } from '../stores/auth-store'
    import { useRouter } from 'vue-router'
    import ButtonComponent from './ButtonComponent.vue'

    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const router = useRouter()

    const itemCount = computed(() => {
        let totalQuantity = 0;
        for (const item of cartStore.items) {
            totalQuantity += item.quantity;
        }
        return totalQuantity;
    });

    const buttonData = computed(() => ({
        id: 'cartButton',
        textContent: `🛒 Panier • ${itemCount.value}`,
        type: 'button',
        class: 'cartButton headerLink'
    }))

    const goToCart = () => {
        if (authStore.isAuthenticated) {
        router.push({ name: 'cart' })
        } else {
        router.push({ name: 'login' })
        }
    }
</script>

<style>

</style>