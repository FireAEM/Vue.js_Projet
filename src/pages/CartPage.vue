<template>
    <Header />
    <section class="cartSection">
        <h2>Mon Panier</h2>
        <div v-if="cartStore.items.length > 0" class="cartList">
            <div v-for="item in cartStore.items" :key="item.id" class="cartItem">
                <p>{{ item.name }} • {{ item.price }} €</p>
                <input type="number" :value="item.quantity" min="0"
                @input="e => updateQuantity(item.id, parseInt(e.target.value))" />
            </div>
            <p>Total : {{ cartStore.totalAmount }} €</p>
        </div>
        <p v-else>Votre panier est vide.</p>
    </section>
    <Footer />
</template>

<script setup lang="ts">
    import Header from '../components/Header.vue'
    import Footer from '../components/Footer.vue'
    import { useCartStore } from '../stores/cart-store'

    const cartStore = useCartStore()

    const updateQuantity = (productId: number, quantity: number) => {
        cartStore.updateQuantity(productId, quantity)
    }
</script>

<style>
    .cartSection {
        display: flex;
        flex-direction: column;
        min-height: 95vh;
        padding: 50px;
    }
    .cartList {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .cartItem {
        display: flex;
        align-items: center;
        background-color: rgb(250, 250, 250);
        justify-content: space-between;
        padding: 10px;
        border-radius: 10px;
    }
    .cartItem > input {
        border: 1px solid #f5f5f5;
        border-radius: 10px;
        padding: 5px;
        resize: vertical;
    }

    .cartList > p {
        padding: 10px;
        font-weight: 500;
        text-align: center;
        background-color: rgb(245, 245, 245);
        border-radius: 25px;
    }
</style>
