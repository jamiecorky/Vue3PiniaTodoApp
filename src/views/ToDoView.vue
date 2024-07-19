<script setup>
import { ref } from 'vue';
import { useToDoStore } from '@/stores/ToDoStore';
import { useModalStore } from '@/stores/ModalStore';
import ToDoColumn from '@/components/ToDoColumn.vue';
import Modal from '@/components/Modal.vue';
import Snackbar from '@/components/Snackbar.vue';

let toDoStore = useToDoStore();
let modalStore = useModalStore();

let newToDoName = ref('');
</script>

<template>
    <main>
        <button
            type="button"
            @click="modalStore.openModal()"
            class="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
            Open Modal
        </button>
        <h1 class="text-3xl font-bold text-center">ToDo Page</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 m-4 gap-4">
            <!-- Filtered in store to show only incomplete in first column -->
            <ToDoColumn title="Incomplete" />
            <!-- Filtered in store to show only complete in second column -->
            <ToDoColumn title="Complete" />
        </div>
    </main>
    <Snackbar />
    <Modal @close="modalStore.closeModal()">
        <template #header>
            <h1>Add a new ToDo</h1>
        </template>
        <template #default>
            <div class="flex gap-4">
                <input class="flex-1 rounded-xl pl-4 border border-slate-300" placeholder="Enter description here" v-model="newToDoName" />
                <button
                    @click="toDoStore.addToDo(newToDoName)"
                    class="bg-green-300 rounded-xl px-3 py-2 hover:bg-green-400"
                >
                    Add ToDo
                </button>
            </div>
        </template>
    </Modal>
</template>
