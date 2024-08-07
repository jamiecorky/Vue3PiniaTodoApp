import axios from 'axios';
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useSnackbarStore } from './SnackbarStore';

export const useToDoStore = defineStore('ToDos', () => {
    let snackbarStore = useSnackbarStore();
    const toDos = ref([]);
    const completed = computed(() => toDos.value.filter(item => item.completed));
    const incomplete = computed(() => toDos.value.filter(item => !item.completed));

    const getInitialToDos = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/todos/random/10');
            toDos.value = response.data;
            snackbarStore.openSnackbar('Welcome to the todo app', 'info');
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
                userId: 2
            });
            if (response.status === 201) {
                console.log(response.data.id);
                // Because this post request doesn't actually update data on the server, I'm pushing to the array as if it was updated. Usually I'd run getInitialToDos() to repopulate
                const newToDo = {
                    todo: toDo,
                    completed: false,
                    id: response.data.id,
                    userId: response.data.userId
                };
                // Every new todo from the response has an id of 255
                toDos.value.push(newToDo);
                snackbarStore.openSnackbar('Todo added', 'success');
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
                snackbarStore.openSnackbar('Todo marked as complete', 'success');
            }
        } catch (error) {
            console.log(error);
            snackbarStore.openSnackbar('Failed to mark todo as complete', 'error');
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
                snackbarStore.openSnackbar('Todo marked as incomplete', 'success');
            }
        } catch (error) {
            console.log(error);
            snackbarStore.openSnackbar('Failed to mark todo as incomplete', 'error');
        }
    };

    const editToDo = async (id, toDoName) => {
        try {
            const response = await axios.put(`https://dummyjson.com/todos/${id}`, {
                todo: toDoName
            });
            if (response.status === 200) {

                toDos.value = toDos.value.map((toDo) => {
                    if (toDo.id === id) {
                        return {
                            ...toDo,
                            todo: toDoName
                        };
                    }
                    return toDo;
                });
                snackbarStore.openSnackbar('Todo name updated', 'success');
            }
        } catch (error) {
            console.log(error);
            snackbarStore.openSnackbar('Failed to mark todo as incomplete', 'error');
        }
    };

    // This errors on newly created todos because dummyjson doesn't like id: 255 which is what they give new todos
    const deleteToDo = async (id) => {
        try {
            const response = await axios.delete(`https://dummyjson.com/todos/${id}`);
            if (response.status === 200) {
                toDos.value = toDos.value.filter((toDo) => toDo.id !== id);
                snackbarStore.openSnackbar('todo deleted', 'success');
            }
        } catch (error) {
            console.log(error);
            snackbarStore.openSnackbar('Failed to delete todo', 'error');
        }
    };

    getInitialToDos();

    return {
        toDos,
        addToDo,
        getInitialToDos,
        completed,
        incomplete,
        markAsComplete,
        markAsIncomplete,
        editToDo,
        deleteToDo
    };
});
