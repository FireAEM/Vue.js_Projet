<template>
    <Header />
    <section class="loginSection">
            <section class="loginFormContainer">
                <h1>Connexion</h1>
                <FormComponent
                    @formChange="onFormChange" 
                    @submit="submitHandler"
                    :data="formData"/>
                <p>Pas encore de compte ? 
                <router-link to="/signup">Inscrivez-vous</router-link>
                </p>
            </section>
        </section>
    <Footer />
</template>

<script setup lang="ts">
    import { ref, reactive } from "vue";
    import Header from '../components/Header.vue'
    import Footer from '../components/Footer.vue'
    import FormComponent from '../components/FormComponent.vue';
    import { useAuthStore } from "../stores/auth-store";

    const authStore = useAuthStore();

    const finalFormData = reactive({}) as any

    const formData = reactive({
        fields: [
            { 
                id: 'email', 
                label: 'Email',
                placeholder: 'Entrez votre email', 
                type: 'email', 
                class: '' 
            },
            { 
                id: 'password', 
                label: 'Mot de passe',
                placeholder: 'Entrez votre mot de passe', 
                type: 'password', 
                class: '' 
            }
        ],
        buttons: [
            { 
                id: 'loginButton',
                textContent: 'Se connecter', 
                type: 'submit', 
                class: '' 
            },
            { 
                id: 'resetButton',
                textContent: 'Réinitialiser', 
                type: 'reset', 
                class: '' 
            }
        ]
    });

    const submitHandler = () => {
        authStore.login(finalFormData);
    }

    const onFormChange = ({ id, val }:{ id: string, val: string }) => {
        finalFormData[id] = val
    }
</script>

<style>
    .loginSection {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 95vh;
    }

    .loginFormContainer {
        display: flex;
        flex-direction: column;
        width: 30vw;
        padding: 50px;
        gap: 25px;
        background-color: rgb(250, 250, 250);
        border-radius: 20px;
    }

    .loginFormContainer h1 {
        text-align: center;
        margin: 0;
    }

    .loginFormContainer > p {
        margin: 0;
        font-weight: 300;
    }
    .loginFormContainer p > a {
        color: var(--text-color);
        text-decoration: underline;
        text-underline-offset: 5px;
        text-decoration-thickness: 1px;
    }
</style>
