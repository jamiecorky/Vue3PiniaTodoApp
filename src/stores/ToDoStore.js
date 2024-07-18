import axios from 'axios';
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useSnackbarStore } from './SnackbarStore';

export const useToDoStore = defineStore('ToDos', () => {
    let snackbarStore = useSnackbarStore();
    const toDos = ref([]);
    const completed = computed(() => {
        return toDos.value.filter((item) => item.completed === true);
    });
    const incomplete = computed(() => {
        return toDos.value.filter((item) => item.completed === false);
    });

    const getInitialToDos = async () => {
        const toDoResponse = await axios.get('https://dummyjson.com/todos/random/10');
        toDos.value = toDoResponse.data;
        snackbarStore.openSnackbar('Welcome to the ToDo App', 'info');
    };

    // User ID hard coded value due to required for post request - haven't scoped users in this todo project
    const addToDo = async (toDo) => {
        axios
            .post('https://dummyjson.com/todos/add', {
                todo: toDo,
                completed: false,
                userId: 1
            })
            .then(function (response) {
                if (response.status === 201) {
                    // Because this post request doesn't actually update data on the server, I'm pushing to the array as if it was updated. Usually I'd run getInitialToDos() to repopulate
                    toDos.value.push({ todo: toDo, completed: false });
                    snackbarStore.openSnackbar('ToDo Added', 'success');
                }
            })
            .catch(function (error) {
                // Will change this to be a snackbar after setting up snackbar store later
                console.log(error);
                snackbarStore.openSnackbar('Something went wrong', 'error');
            });
    };

    const markAsComplete = async (id) => {
        console.log(id);
        axios
            .put(`https://dummyjson.com/todos/${id}`, {
                completed: true
            })
            .then(function (response) {
                if (response.status === 200) {
                    // Due to the dummy response .map allowed to return a new array to reference from original array
                    toDos.value = toDos.value.map((toDo) => {
                        if (toDo.id === id) {
                            return {
                                ...toDo,
                                completed: true
                            };
                        }
                        return toDo;
                    });
                    // Will change this to be a snackbar after setting up snackbar
                }
            })
            .catch(function (error) {
                // Will change this to be a snackbar after setting up snackbar store later
                console.log(error);
            });
    };

    getInitialToDos();

    return { toDos, addToDo, completed, incomplete, markAsComplete };
});
