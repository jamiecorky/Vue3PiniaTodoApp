<script setup>
import CheckCircle from './icons/CheckCircle.vue';
import { useToDoStore } from '@/stores/ToDoStore';

let toDoStore = useToDoStore();

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
    },
    id: {
        type: Number,
        required: false
    }
});
</script>

<template>
    <div class="p-4 flex items-center justify-between gap-4 bg-slate-200 rounded-xl border border-gray-400 shadow-md">
        <h6>{{ todo }}</h6>
        <CheckCircle v-if="completed" class="text-green-500 flex-none" />
        <button
            v-if="!completed"
            class="bg-green-300 rounded-xl px-3 py-2 hover:bg-green-400"
            @click="toDoStore.markAsComplete(id)"
        >
            Mark as Complete
        </button>
    </div>
</template>

<style scoped></style>
