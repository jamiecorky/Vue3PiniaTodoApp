import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSnackbarStore = defineStore('Snackbar', () => {
    const show = ref(false);
    const title = ref('');
    const type = ref('');

    // Opens snackbar - defaults added in case they're not set
    const openSnackbar = (text = 'Action Complete', role = 'success') => {
        // Close the snackbar if it is already open
        if (show.value) {
            show.value = false;
        }

        // Set a timeout before opening the new snackbar
        setTimeout(() => {
            title.value = text;
            type.value = role;
            show.value = true;
        }, show.value ? 300 : 0);

        // Close the snackbar after 5 seconds
        setTimeout(() => {
            show.value = false;
        }, 5000);
    };

    const closeSnackbar = () => {
        show.value = false;
    };
    
    return {
        show,
        title,
        type,
        openSnackbar,
        closeSnackbar
    };
});
