<script setup>
import { useModalStore } from '@/stores/ModalStore';
let modalStore = useModalStore();

</script>

<template>
    <div v-if="modalStore.show" class="fixed inset-0 bg-black/80 grid place-items-center">
        <div class="bg-white p-8 rounded-xl w-[90vw] max-w-[600px]">
            <header class="my-2">
                <slot name="header"></slot>
            </header>

            <div class="my-8 w-full">
                <slot></slot>
            </div>

            <footer>
                <slot name="footer">
                    <button
                        id="close-modal"
                        class="bg-slate-300 rounded-xl px-3 py-2 hover:bg-slate-400"
                        @click="modalStore.closeModal()"
                    >
                        close
                    </button>
                </slot>
            </footer>
        </div>
    </div>
</template>

<style scoped></style>
