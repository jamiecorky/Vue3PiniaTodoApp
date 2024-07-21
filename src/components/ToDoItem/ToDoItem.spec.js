import ToDoItem from "@/components/ToDoItem/ToDoItem.vue";
import { createTestingPinia } from "@pinia/testing";
import { createPinia, setActivePinia } from "pinia";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, test, vitest } from "vitest";
import { useToDoStore } from "@/stores/ToDoStore";

// These tests are for the ToDo Store
// describe( "Todo Store", () => {
//     beforeEach(() => {
//         setActivePinia(createPinia());
//     });

//     test('displays text', () => {
//         const toDoStore = useToDoStore();
//         expect(toDoStore.show).toBe(false);
//     });
// });

describe('ToDoItem.vue', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = mount(ToDoItem, {
            props: {
                todo: 'test todo',
                completed: false,
                id: 99,
            },
            global: {
                plugins: [createTestingPinia({
                    createSpy: vitest.fn
                })]
            }
        });
        setActivePinia(createPinia());
    });

    test('Ensure props are passed in', () => {
        expect(wrapper.props('todo')).toBe('test todo');
    });

    // test('modal close button is visible when modal is open', async () => {
    //     // Mount - previous test shows this works
    //     const wrapper = mount(Modal);
    //     // Open the modal to set the v-if to be true, this is tested above
    //     const modal = useModalStore()
    //     modal.openModal()
    //     // Wait for the next tick to allow the DOM to update
    //     await wrapper.vm.$nextTick()
    //     // Footer default should find the button if the modal is open
    //     expect(wrapper.find('#close-modal').exists()).toBe(true);
    // });
});