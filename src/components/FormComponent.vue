<template>
    <form @submit.prevent="$emit('submit')" class="form">
        <FieldComponent 
            v-for="(field, index) in data.fields"
            :key="index"
            :data="field"
            @fieldChange="onFieldChange"
        />
        <ButtonComponent
            v-for="(button, index) in data.buttons"
            :key="index"
            :data="button"
        />
    </form>
</template>

<script setup lang="ts">
    import FieldComponent from './FieldComponent.vue'
    import ButtonComponent from './ButtonComponent.vue'

    interface FormComponentProperties {
    data: {
        fields: Array<{ id: string, label: string, placeholder: string, type?: string, class?: string }>,
        buttons: Array<{ id: string, textContent: string, class?: string, type?: 'button' | 'reset' | 'submit' }>
    }
    }

    defineProps<FormComponentProperties>()
    const emit = defineEmits(['submit', 'formChange'])

    const onFieldChange = ({ id, val }: { id: string, val: string }) => {
        emit('formChange', { id, val })
    }
</script>

<style>
    .form {
        display: flex;
        flex-direction: column;
        margin: 0;
        gap: 10px;
    }
    .form button:first-of-type {
        margin-top: 10px;
    }
</style>