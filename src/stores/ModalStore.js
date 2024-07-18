import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('Modal', () => {
    const show = ref(false);

    const openModal = () => {
        show.value = true;
    };

    const closeModal = () => {
        show.value = false;
    };

    return {
        show,
        openModal,
        closeModal
    };
});
