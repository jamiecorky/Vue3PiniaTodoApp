<script setup>
import { computed, ref } from 'vue';
import { useToDoStore } from '@/stores/ToDoStore';
import ToDoItem from '@/components/ToDoItem.vue';

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
        <h2 class="text-xl text-center">{{ title }}</h2>
        <div class="grid grid-cols-2 m-8 gap-4">
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