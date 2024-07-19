<script setup>
import { useSnackbarStore } from '@/stores/SnackbarStore';
import { storeToRefs } from 'pinia';
import CloseIcon from './icons/CloseIcon.vue';

const snackbarStore = useSnackbarStore();
const { type, title, show } = storeToRefs(snackbarStore);
</script>

<template>
    <transition name="slide" appear>
        <div class="fixed top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-xs w-[80vw] rounded-lg p-4" :class="type" v-if="show">
            <div class="flex justify-between items-center m-2">
                <div class="m-0 font-semibold">{{ title }}</div>
                <CloseIcon class="w-11 cursor-pointer transition-opacity m-0 hover:opacity-80" @click="snackbarStore.closeSnackbar()" />
            </div>
        </div>
    </transition>
</template>

<style scoped>
/* Feels cleaner to have these classes down here since they're binding based on type */
.error {
    @apply bg-red-600 text-white;
}

.success {
    @apply bg-green-500 text-black;
}

.warning {
    @apply bg-yellow-500 text-white;
}

.info {
    @apply bg-blue-500 text-black;
}

/* Transition styles */
.slide-enter-active,
.slide-leave-active {
    @apply transition-transform duration-[800];
}

.slide-enter,
.slide-leave-to {
    @apply -translate-x-1/2 -translate-y-full;
}
</style>

