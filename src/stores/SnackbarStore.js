import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSnackbarStore = defineStore('Snackbar', () => {
    const show = ref(false);

    const openSnackbar = () => {
        show.value = true;
    };

    const closeSnackbar = () => {
        show.value = false;
    };

    return { show, openSnackbar, closeSnackbar };
});
