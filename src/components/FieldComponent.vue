<template>
    <article class="field">
      <label :for="data.id">{{ data.label }}</label>
      <input 
            @input="(event:any) => $emit('fieldChange', {
                id: data.id,
                val: event.target.value
            })"
            :type="data.type ? data.type : 'text'"
            :id="data.id"
            :placeholder="data.placeholder"
            :class="'input ' + (data.class ? data.class : '')"
        >
    </article>
</template>

<script setup lang="ts">
    interface FieldComponentProperties {
        data: {
            id: string,
            label: string,
            placeholder: string,
            type?: string,
            class?: string
        }
    }

    defineProps<FieldComponentProperties>()
    const emit = defineEmits(['fieldChange'])
</script>

<style>
    .field {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .field label {
        font-weight: 500;
    }

    .field input {
        border: 1px solid #f5f5f5;
        border-radius: 10px;
        padding: 10px;
        resize: vertical;
    }
</style>