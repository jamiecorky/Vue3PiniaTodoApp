import axios from 'axios';
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useToDoStore = defineStore('ToDos', () => {
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
                    // Because this post request doesn't actually update data on the server, I'm pushing to the array as if it was updated (instead I'd run getInitialToDos())
                    toDos.value.push({ todo: toDo, completed: false });
                    // Will change this to be a snackbar after setting up snackbar
                }
            })
            .catch(function (error) {
                // Will change this to be a snackbar after setting up snackbar store later
                console.log(error);
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
                    // Need to update array item where todo id === id here
                    // console.log(response);
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
