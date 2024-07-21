import ToDoItem from "@/components/ToDoItem/ToDoItem.vue";
import { createTestingPinia } from "@pinia/testing";
import { createPinia, setActivePinia } from "pinia";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, test, vitest } from "vitest";
import { useToDoStore } from "@/stores/ToDoStore";

// These tests are for the ToDo Store
describe( "Todo Store", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    test('todo items are populated', async () => {
        const toDoStore = useToDoStore();
        // Struggling to figure out the correct way to test this so used setTimeout for now
        setTimeout(() => {
            expect(toDoStore.toDos.value.length).toBe(10);
        }, 1000);
    });
});

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


});