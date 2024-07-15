<script setup>
import { ref } from 'vue';
import { useToDoStore } from '@/stores/ToDoStore';
import { useModalStore } from '@/stores/ModalStore';
import ToDoItem from '@/components/ToDoItem.vue';
import Modal from '@/components/Modal.vue';

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
            <div>
                <h2 class="text-xl text-center">Incomplete</h2>
                <div class="grid grid-cols-2 m-8 gap-4">
                    <ToDoItem
                        v-for="toDo in toDoStore.incomplete"
                        :key="toDo.id"
                        :id="toDo.id"
                        :todo="toDo.todo"
                        :completed="toDo.completed"
                        description="no"
                    />
                </div>
            </div>

            <!-- Filtered in store to show only complete in second column -->
            <div>
                <h2 class="text-xl text-center">Complete</h2>
                <div class="grid grid-cols-2 m-8 gap-4">
                    <ToDoItem
                        v-for="toDo in toDoStore.completed"
                        :key="toDo.id"
                        :id="toDo.id"
                        :todo="toDo.todo"
                        :completed="toDo.completed"
                        description="no"
                    />
                </div>
            </div>
        </div>
    </main>

    <Modal :show="modalStore.showModal" @close="modalStore.closeModal()">
        <template #header>
            <h1>Add a new ToDo</h1>
        </template>
        <template #default>
            <div class="flex gap-4">
                <input class="flex-1" placeholder="Enter description here" v-model="newToDoName" />
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
