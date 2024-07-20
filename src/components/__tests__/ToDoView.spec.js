import { test, expect } from "vitest";

function sum(a, b) {
  return a + b;
}

test("add 2 numbers", () => {
  expect(sum(2,3)).toEqual(5);
});
// import { mount } from '@vue/test-utils';
// import { describe, it, expect } from 'vitest';
// import ToDoView from '@/views/ToDoView.vue';
// import { useToDoStore } from '@/stores/ToDoStore';

// describe('ToDoView', () => {
//     it('renders the todo item correctly', () => {
//         const todo = {
//             id: 1,
//             title: 'Buy groceries',
//             completed: false,
//         };

//         const wrapper = mount(ToDoView, {
//             props: {
//                 todo,
//             },
//         });

//         expect(wrapper.find('.todo-title').text()).toBe(todo.title);
//         expect(wrapper.find('.todo-completed').exists()).toBe(todo.completed);
//     });

//     it('emits an event when the todo is completed', async () => {
//         const todo = {
//             id: 1,
//             title: 'Buy groceries',
//             completed: false,
//         };

//         const wrapper = mount(ToDoView, {
//             props: {
//                 todo,
//             },
//         });

//         await wrapper.find('.todo-completed').trigger('click');

//         expect(wrapper.emitted('complete')).toBeTruthy();
//         expect(wrapper.emitted('complete')[0][0]).toBe(todo.id);
//     });
// });