<script setup>
import { ref } from 'vue';
import { useToDoStore } from '@/stores/ToDoStore';
import { useModalStore } from '@/stores/ModalStore';
import Card from '@/components/Card.vue';
import ToDoColumn from '@/components/ToDoColumn.vue';
import Modal from '@/components/Modal.vue';
import Snackbar from '@/components/Snackbar.vue';
import AddTaskIcon from '@/components/icons/AddTaskIcon.vue';

let toDoStore = useToDoStore();
let modalStore = useModalStore();

let newToDoName = ref('');
</script>

<template>
    <main>
        <Card>
            <h1 class="text-3xl font-bold text-center">ToDo Page</h1>
            <button
                type="button"
                @click="modalStore.openModal()"
                class="rounded-md bg-green-500 my-4 flex mx-auto no-wrap gap-4 px-4 py-3 text-sm font-medium text-black hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
                <span>Add New ToDo</span>
                <AddTaskIcon />
            </button>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Filtered in store to show only incomplete in first column -->
                <ToDoColumn title="Incomplete" />
                <!-- Filtered in store to show only complete in second column -->
                <ToDoColumn title="Complete" />
            </div>
        </Card>
        
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
