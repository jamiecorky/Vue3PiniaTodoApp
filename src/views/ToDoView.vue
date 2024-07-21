<script setup>
import { ref } from 'vue';
import { useToDoStore } from '@/stores/ToDoStore';
import { useModalStore } from '@/stores/ModalStore';
import Card from '@/components/Card.vue';
import ToDoColumn from '@/components/ToDoColumn.vue';
import Modal from '@/components/Modal/Modal.vue';
import Snackbar from '@/components/Snackbar/Snackbar.vue';
import AddTaskIcon from '@/components/icons/AddTaskIcon.vue';

let toDoStore = useToDoStore();
let modalStore = useModalStore();

let newToDoName = ref('');

const addNewToDo = () => {
    if (newToDoName.value !== '') {
        toDoStore.addToDo(newToDoName.value);
        newToDoName.value = '';
        modalStore.closeModal();
    }
};
</script>

<template>
    <main>
        <Card>
            <h1 class="text-3xl font-bold text-center">ToDo Page</h1>
            <button
                type="button"
                @click="modalStore.openModal()"
                class="rounded-lg bg-green-500 my-4 flex mx-auto no-wrap gap-4 px-4 py-3 text-sm font-medium text-black hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
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
    <!-- Kept the modal fairly simple for now with slots -->
    <Modal @close="modalStore.closeModal()">
        <template #header>
            <h1>Add a new ToDo</h1>
        </template>
        <template #default>
            <div class="flex gap-4">
                <input class="flex-1 rounded-lg pl-4 border border-slate-300" placeholder="Enter description here" v-model="newToDoName" />
                <button
                    @click="addNewToDo()"
                    class="rounded-lg bg-green-500 flex mx-auto no-wrap px-4 py-3 text-sm font-medium text-black hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                    Add ToDo
                </button>
            </div>
        </template>
    </Modal>
</template>
