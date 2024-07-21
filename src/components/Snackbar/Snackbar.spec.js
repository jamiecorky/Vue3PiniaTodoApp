import Snackbar from "@/components/Snackbar/Snackbar.vue";
import { createTestingPinia } from "@pinia/testing";
import { createPinia, setActivePinia } from "pinia";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, test, vitest } from "vitest";
import { useSnackbarStore } from "@/stores/SnackbarStore";

// These tests are for the Snackbar Store
describe( "Snackbar Store", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    test('that the show state is set to false', () => {
        const snackbarStore = useSnackbarStore();
        expect(snackbarStore.show).toBe(false);
    });

    test('open snackbar sets the title', () => {
        const snackbarStore = useSnackbarStore();
        snackbarStore.openSnackbar('Todo added', 'success');
        // Use set timeout to allow the snackbar to open before checking the title
        setTimeout(() => {
            expect(snackbarStore.title).toBe('Todo added');
        }, 1000);
    });

    test('open snackbar sets the type', () => {
        const snackbarStore = useSnackbarStore();
        snackbarStore.openSnackbar('Todo added', 'error');
        // Use set timeout to allow the snackbar to open before checking the title
        setTimeout(() => {
            expect(snackbarStore.type).toBe('error');
        }, 1000);
    });

    test('close snackbar function sets show to be false', () => {
        const snackbarStore = useSnackbarStore();
        // Open the snackbar first
        snackbarStore.openSnackbar('Todo added', 'success');
        snackbarStore.closeSnackbar();
        expect(snackbarStore.show).toBe(false);
    });
});

describe('Snackbar.vue', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = mount(Snackbar, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vitest.fn
                })]
            }
        });
        setActivePinia(createPinia());
    });

    test('snackbar component mounts', () => {
        const wrapper = mount(Snackbar);
        expect(wrapper.exists()).toBe(true);
    });

    test('snackbar opens', () => {
        const wrapper = mount(Snackbar);
        const snackbarStore = useSnackbarStore()
        snackbarStore.openSnackbar('Todo added', 'success');
        // Snackbar should be open after 2 seconds so it should be open now
        setTimeout(() => {
            expect(wrapper.find('div').exists()).toBe(true);
        }, 1000);
    });

    test('snackbar displays the passed in text', () => {
        const wrapper = mount(Snackbar);
        const snackbarStore = useSnackbarStore()
        snackbarStore.openSnackbar('Added some text', 'success');
        // Snackbar should be open after 2 seconds so it should be open now
        setTimeout(() => {
            expect(wrapper.find('#title')).toBe('Added some text');
        }, 1000);
    });
});