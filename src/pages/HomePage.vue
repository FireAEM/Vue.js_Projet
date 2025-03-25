<template>
    <Header />
    <section class="home">
      <h1>Liste des Smartphones</h1>
      <div class="productsList">
        <ProductCardComponent
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
    <Footer />
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import Header from '../components/Header.vue'
    import Footer from '../components/Footer.vue'
    import ProductCardComponent from '../components/ProductCardComponent.vue'
    import productsData from '../data/products.json'

    const products = ref<Array<{ id: number; name: string; description: string; price: number }>>([])

    onMounted(() => {
        console.log("HomePage montée")
        products.value = productsData
    })
</script>

<style>
    .home {
        min-height: 95vh;
        margin-bottom: 100px;
        padding: 50px;
    }
    .productsList {
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
        margin: auto;
        gap: 25px;
    }
</style>