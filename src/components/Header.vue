<template>
    <header>
        <router-link to="/">
            <img src="../assets/images/logo.png" alt="T-Square Logo" class="headerLogo">
        </router-link>
        <div class="headerContainer">
            <router-link v-if="!authStore.isAuthenticated" to="/signup" class="headerLink">
                📝 Inscription
            </router-link>

            <router-link v-if="!authStore.isAuthenticated" to="/login" class="headerLink">
                🧔 Connexion
            </router-link>

            <ButtonComponent v-if="authStore.isAuthenticated" :data="logoutButtonData" @click="logout" />

            <CartButtonComponent />
        </div>
    </header>
</template>

<script setup lang="ts">
    import { useAuthStore } from '../stores/auth-store'
    import CartButtonComponent from './CartButtonComponent.vue'
    import ButtonComponent from './ButtonComponent.vue'

    const authStore = useAuthStore()

    const logoutButtonData = {
        id: 'logoutButton',
        textContent: '🚪 Déconnexion',
        type: 'button',
        class: 'headerLink'
    }

    const logout = () => {
        authStore.logout()
    }
</script>

<style>
    header {
        position: sticky;
        top: 10px;
        width: 75vw;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: auto;
        align-items: center;
        padding: 10px 25px;
        background-color: var(--header-background);
        border: 1px solid var(--border-color2);
        border-radius: 50px;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        z-index: 100;
        transition: 0.25s;
    }

    .headerLogo {
        width: 50px;
        height: auto;
    }
    .headerLogo:active {
        transform: scale(0.95);
        transition: 0.25s;
    }

    .headerContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }

    .headerLink {
        padding: 10px;
        border: 1px solid var(--border-color2);
        border-radius: 50px;
        background-color: var(--background-color2);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        text-decoration: none;
        color: var(--text-color);
        gap: 10px;
        cursor: pointer;
    }
    .headerLink:hover {
        background-color: var(--accent-color1);
        transition: 0.25s;
    }
    .headerLink:active {
        background-color: var(--accent-color2);
        transform: scale(0.95);
        transition: 0.25s;
    }
</style>