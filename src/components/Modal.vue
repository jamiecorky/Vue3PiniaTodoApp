<script setup>
const props = defineProps({
    show: Boolean
});
</script>

<template>
    <div v-if="props.show" class="fixed inset-0 bg-black/80 grid place-items-center">
        <div class="bg-white p-4 w-[90vw] max-w-[600px]">
            <header>
                <slot name="header"></slot>
            </header>

            <div>
                <slot></slot>
            </div>

            <footer>
                <slot name="footer">
                    <button @click="$emit('close')">close</button>
                </slot>
            </footer>
        </div>
    </div>
</template>

<style scoped></style>
