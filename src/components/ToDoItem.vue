<script setup>
const props = defineProps({
    todo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});
</script>

<template>
    <div class="p-4 flex justify-center align-middle bg-slate-200 rounded-xl h-80">
        <h6>{{ props.todo }}</h6>
        <!-- <p>{{ description }}</p> -->
        <span v-if="completed">{{ completed }}</span>
    </div>
</template>

<style scoped></style>
