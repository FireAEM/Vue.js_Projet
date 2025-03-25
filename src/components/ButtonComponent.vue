<template>
    <button 
      :id="data.id"
      :type="data.type ? data.type : 'button'"
      :class="'button ' + (data.class ? data.class : '')"
      @click="$emit('click')"
    >
      {{ data.textContent }}
    </button>
</template>

<script setup lang="ts">
    interface ButtonComponentProperties {
        data: {
            id: string,
            textContent: string,
            class?: string,
            type?: 'button' | 'reset' | 'submit'
        }
    }

    defineProps<ButtonComponentProperties>()
    const emit = defineEmits(['click'])
</script>

<style>
    .button {
        padding: 10px;
        background-color: var(--button-background);
        color: var(--button-text-color);
        border: none;
        border-radius: var(--button-border-radius);
        text-decoration: none;
        cursor: pointer;
        transition: 0.25s;
    }
    .button:hover {
        background-color: var(--accent-color1);
        color: var(--text-color);
    }
    .button:active {
        background-color: var(--accent-color2);
        color: var(--text-color);
        transform: scale(0.95);
    }
</style>