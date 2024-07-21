<script setup>
import { computed, ref } from 'vue';
import { useToDoStore } from '@/stores/ToDoStore';
import ToDoItem from '@/components/ToDoItem/ToDoItem.vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    }
});

let toDoStore = useToDoStore();
const arrayToAccess = computed(() => props.title === 'Complete' ? toDoStore.completed : toDoStore.incomplete);
</script>
<template>
    <div>
        <h2 class="text-xl text-center mb-4">{{ title }}</h2>
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <ToDoItem
                v-for="toDo in arrayToAccess"
                :key="toDo.id"
                :id="toDo.id"
                :todo="toDo.todo"
                :completed="toDo.completed"
                description="no"
            />
        </div>
    </div>
</template>
<style scoped>
</style>