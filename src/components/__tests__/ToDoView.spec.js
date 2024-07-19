import { mount } from '@vue/test-utils';
import ToDoView from '@/views/ToDoView.vue';

// Import the necessary dependencies

// Describe the component being tested
test('ToDoView', () => {
    // Define the test case
    it('renders the todo item correctly', () => {
        // Mount the component
        const wrapper = mount(ToDoView, {
            propsData: {
                todo: {
                    id: 1,
                    title: 'Buy groceries',
                    completed: false,
                },
            },
        });

        // Assert the expected outcome
        expect(wrapper.text()).toContain('Buy groceries');
        // expect(wrapper.find('.completed').exists()).toBe(false);
    });

});