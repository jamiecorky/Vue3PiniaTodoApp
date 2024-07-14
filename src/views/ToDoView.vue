<script setup>
import { ref } from 'vue';
import { useToDoStore } from '@/stores/ToDoStore';
import ToDoItem from '@/components/ToDoItem.vue';
import Modal from '@/components/Modal.vue';

let toDoStore = useToDoStore();

let showModal = ref(false);

const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};
</script>

<template>
    <main>
        <button
            type="button"
            @click="openModal()"
            class="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
            Open Modal
        </button>
        <h1 class="text-3xl font-bold underline">Hello world!</h1>
        <div class="grid grid-cols-4 m-4 gap-4">
            <ToDoItem v-for="toDo in toDoStore.toDos" :todo="toDo.todo" completed="no" description="no" />
        </div>
    </main>

    <Modal :show="showModal" @close="closeModal()">
        <template #header>
            <h1>Add a new ToDo</h1>
        </template>
        <slot>
            <input placeholder="Enter description here" />
            <!-- Need to add something to push to store from here -->
            <button class="bg-blue-300 rounded-xl p-2">Submit</button>
        </slot>
    </Modal>
</template>
