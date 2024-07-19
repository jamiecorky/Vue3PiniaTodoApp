import axios from 'axios';
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useSnackbarStore } from './SnackbarStore';
import { useModalStore } from './ModalStore';

export const useToDoStore = defineStore('ToDos', () => {
    let snackbarStore = useSnackbarStore();
    const toDos = ref([]);
    const completed = computed(() => toDos.value.filter(item => item.completed));
    const incomplete = computed(() => toDos.value.filter(item => !item.completed));

    const getInitialToDos = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/todos/random/10');
            toDos.value = response.data;
            snackbarStore.openSnackbar('Welcome to the ToDo App', 'info');
        } catch (error) {
            console.log(error);
            snackbarStore.openSnackbar('Failed to fetch initial todos', 'error');
        }
    };

    // User ID hard coded value due to required for post request - haven't scoped users in this todo project
    const addToDo = async (toDo) => {
        try {
            const response = await axios.post('https://dummyjson.com/todos/add', {
                todo: toDo,
                completed: false,
                userId: 1
            });
            if (response.status === 201) {
                // Because this post request doesn't actually update data on the server, I'm pushing to the array as if it was updated. Usually I'd run getInitialToDos() to repopulate
                const newToDo = {
                    todo: toDo,
                    completed: false,
                    id: response.data.id,
                    userId: response.data.userId
                };
                toDos.value.push(newToDo);
                snackbarStore.openSnackbar('ToDo Added', 'success');
            }
        } catch (error) {
            console.log(error);
            snackbarStore.openSnackbar('Something went wrong', 'error');
        }
    };

    const markAsComplete = async (id) => {
        try {
            const response = await axios.put(`https://dummyjson.com/todos/${id}`, {
                completed: true
            });
            if (response.status === 200) {
                toDos.value = toDos.value.map((toDo) => {
                    if (toDo.id === id) {
                        return {
                            ...toDo,
                            completed: true
                        };
                    }
                    return toDo;
                });
                snackbarStore.openSnackbar('ToDo marked as complete', 'success');
            }
        } catch (error) {
            console.log(error);
            snackbarStore.openSnackbar('Failed to mark ToDo as complete', 'error');
        }
    };

    const markAsIncomplete = async (id) => {
        try {
            const response = await axios.put(`https://dummyjson.com/todos/${id}`, {
                completed: false
            });
            if (response.status === 200) {
                toDos.value = toDos.value.map((toDo) => {
                    if (toDo.id === id) {
                        return {
                            ...toDo,
                            completed: false
                        };
                    }
                    return toDo;
                });
                snackbarStore.openSnackbar('ToDo marked as incomplete', 'success');
            }
        } catch (error) {
            console.log(error);
            snackbarStore.openSnackbar('Failed to mark ToDo as incomplete', 'error');
        }
    };

    const deleteToDo = async (id) => {
        try {
            const response = await axios.delete(`https://dummyjson.com/todos/${id}`);
            if (response.status === 200) {
                toDos.value = toDos.value.filter((toDo) => toDo.id !== id);
                snackbarStore.openSnackbar('ToDo deleted', 'success');
            }
        } catch (error) {
            console.log(error);
            snackbarStore.openSnackbar('Failed to delete ToDo', 'error');
        }
    };

    getInitialToDos();

    return {
        toDos,
        addToDo,
        completed,
        incomplete,
        markAsComplete,
        markAsIncomplete,
        deleteToDo
    };
});
