<script setup>
import { useToDoStore } from '@/stores/ToDoStore';
import { computed, ref, watchEffect } from 'vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import EditIcon from '@/components/icons/EditIcon.vue';
import CheckCircleIcon from '@/components/icons/CheckCircleIcon.vue';

const props = defineProps({
    todo: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    id: {
        type: Number,
        required: false
    }
});
const model = defineModel()
const toDoStore = useToDoStore();
const editable = ref(false);
const todoText = ref(props.todo);

const inputOrText = computed(() => editable.value ? 'input' : 'span');

// Only updated if the value is changed, changes editable regardless
const updateTodoText = () => {
    if (props.todo !== todoText.value && todoText.value !== '') {
        toDoStore.editToDo(props.id, todoText.value);
    }
    editable.value = false;
};
</script>

<template>
    <div data-test="todo-item" class="p-4 flex items-center justify-between gap-4 bg-slate-200 rounded-xl border border-gray-400 shadow-md">
        <!-- Added title for tooltip of full text -->
        <div v-if="editable" class="w-full relative">
            <input type="text" :title="todoText" :value="todoText" @input="todoText = $event.target.value" @keyup.enter="updateTodoText()" class="w-full border border-slate-300 rounded-lg h-10 p-4 pr-10" />
            <button @click="updateTodoText()" @keyup.enter="updateTodoText()" class="absolute inset-y-0 right-0 pr-3 flex items-center text-green-500 hover:text-green-600">
                <CheckCircleIcon />
            </button>
        </div>
        <span v-else>{{ todo }}</span>

        <div class="flex gap-2">
            <button @click="editable = !editable" class="hover:bg-slate-300 rounded-xl">
                <EditIcon v-if="!editable" />
                <CloseIcon v-if="editable" />
            </button>
            <button
                v-if="completed"
                class="check-icon-reverse"
                @click="toDoStore.markAsIncomplete(id)"
            ></button>
            <button
                v-else
                class="check-icon"
                @click="toDoStore.markAsComplete(id)"
            >
            </button>
            <button @click="toDoStore.deleteToDo(id)" class="hover:bg-slate-300 rounded-xl">
                <DeleteIcon />
            </button>
        </div>
    </div>
</template>

<style scoped>
/* Mouse movements seemed to be buggy with a javascript event handler picking up mouse movement for the icon components hover, css hover avoids all of that - would use <component :is></component> or v-if/else in other cases */
.check-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: currentColor;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8'/%3E%3C/svg%3E");
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
}

.check-icon:hover, .check-icon:focus {
    display: inline-block;
    width: 20px;
    height: 20px;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m3.88-11.71L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0'/%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
}

.check-icon-reverse {
    display: inline-block;
    width: 20px;
    height: 20px;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m3.88-11.71L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0'/%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
}

.check-icon-reverse:hover, .check-icon-reverse:focus {
    display: inline-block;
    width: 20px;
    height: 20px;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8'/%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
}
</style>