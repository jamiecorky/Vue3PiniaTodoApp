<script setup>
import { useToDoStore } from '@/stores/ToDoStore';
import ToDoItem from '@/components/ToDoItem.vue';
import Modal from '@/components/Modal.vue';

let toDoStore = useToDoStore();
</script>

<template>
    <main>
        <button @click="openTodoModal()">Add Todo</button>
        <h1 class="text-3xl font-bold underline">Hello world!</h1>
        <div class="grid grid-cols-4 m-4 gap-4">
            <ToDoItem v-for="toDo in toDoStore.toDos" :todo="toDo.todo" completed="no" description="no" />
        </div>
    </main>

    <Modal />
</template>
