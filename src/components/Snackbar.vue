<script setup>
import { useSnackbarStore } from '@/stores/SnackbarStore';
import { storeToRefs } from 'pinia';
import CloseIcon from './icons/CloseIcon.vue';

const snackbarStore = useSnackbarStore();
const { type, title, show } = storeToRefs(snackbarStore);
</script>

<template>
    <transition name="slide" appear>
        <div class="modal" :class="type" v-if="show">
            <div class="header">
                <div class="title">{{ title }}</div>
                <CloseIcon class="icon" @click="snackbarStore.closeSnackbar()" />
            </div>
        </div>
    </transition>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem;
}
.title {
    margin: 0;
    font-weight: 600;
}

.icon {
    width: 2.2rem;
    cursor: pointer;
    transition: opacity 0.3s ease-out;
    margin: 0;
}

.icon:hover {
    opacity: 0.8;
}

.error {
    background-color: #e23636;
    color: #fff;
}

.success {
    background-color: #82dd55;
    color: #000;
}

.warning {
    background-color: #edb95e;
    color: #fff;
}

.info {
    background-color: #2b7aef;
    color: #000;
}

.modal {
    position: fixed;
    top: 4rem;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 998;
    max-width: 32rem;
    width: 80vw;
    border-radius: 16px;
    padding: 1rem;
}
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.8s;
}
.slide-enter,
.slide-leave-to {
    transform: translateX(-50%) translateY(-100vh);
}
</style>
