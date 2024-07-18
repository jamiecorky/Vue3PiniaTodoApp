import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSnackbarStore = defineStore('Snackbar', () => {
    const show = ref(false);
    const title = ref('');
    const type = ref('');

    // Opens snackbar - defaults added in case they're not set
    const openSnackbar = (text = 'Action Complete', role = 'success') => {
        // This closes the snackbar if there is one already open then sets a 0.3 sec gap before opening a new one
        let timeout = 0;
        if ((show.value = true)) {
            show.value = false;
            timeout = 300;
        }
        setTimeout(() => {
            title.value = text;
            type.value = role;
            show.value = true;
        }, timeout);
        // This now waits 5 seconds before closing the snackbar
        setTimeout(() => {
            show.value = false;
        }, 5000);
    };

    const closeSnackbar = () => {
        show.value = false;
    };

    return { show, title, type, openSnackbar, closeSnackbar };
});
