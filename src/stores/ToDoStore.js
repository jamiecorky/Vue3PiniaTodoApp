import axios from 'axios';

import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';

export const useToDoStore = defineStore('ToDos', () => {
    const isLoading = ref(false);
    const toDos = ref([]);

    //   const doubleCount = computed(() => count.value * 2)
    console.log(toDos);
    // function increment() {
    //     count.value++;
    // }

    const getInitialToDos = async () => {
        isLoading.value = true;

        const toDoResponse = await axios.get('https://dummyjson.com/todos/random/10');
        console.log(toDoResponse);
        toDos.value = toDoResponse.data;
    };

    getInitialToDos();

    return { toDos };
});

// export const useTodosStore = defineStore('Todos', {
//     state: () => ({
//         todos: []
//     }),
//     getters: {
//         Todos(state) {
//             return state.todos;
//         }
//     },
//     actions: {
//         async Todos() {
//             try {
//                 const data = await axios.get('https://dummyjson.com/todos/random/10');
//                 console.log(data);
//                 this.data = data.data;
//             } catch (error) {
//                 alert(error);
//                 console.log(error);
//             }
//         }
//     }
// });
