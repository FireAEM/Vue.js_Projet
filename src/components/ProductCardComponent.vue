<template>
    <div class="productCard">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <p>{{ product.price }} €</p>
      <ButtonComponent :data="addButtonData" @click="handleAddToCart" />
    </div>
</template>

<script setup lang="ts">
    import { defineProps } from 'vue'
    import ButtonComponent from './ButtonComponent.vue'
    import { useCartStore } from '../stores/cart-store'
    import { useAuthStore } from '../stores/auth-store'
    import { useRouter } from 'vue-router'

    const props = defineProps<{ product: { id: number; name: string; description: string; price: number } }>()

    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const router = useRouter()

    const addButtonData = {
        id: 'addToCart-' + props.product.id,
        textContent: 'Ajouter au panier',
        type: 'button',
        class: 'addToCartButton'
    }

    const handleAddToCart = () => {
        if (authStore.isAuthenticated) {
            cartStore.addItem(props.product)
        } else {
            router.push({ name: 'login' })
        }
    }
</script>

<style scoped>
    .productCard {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: center;
        justify-content: space-between;
        align-items: center;
        border: 1px solid var(--border-color1);
        padding: 20px;
        width: 250px;
        text-align: center;
        border-radius: 20px;
        transition: 0.25s;
    }
    .productCard:hover {
        cursor: pointer;
        transform: scale(1.05);
    }
</style>
  