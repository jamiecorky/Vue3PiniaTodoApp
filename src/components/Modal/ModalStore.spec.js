import Modal from "@/components/Modal/Modal.vue";
import { createTestingPinia } from "@pinia/testing";
import { createPinia, setActivePinia } from "pinia";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, test, vitest } from "vitest";
import { useModalStore } from "@/stores/ModalStore";

// These tests are for the Modal Store
describe( "Modal Store", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    test('that the show state is set to false', () => {
        const modalStore = useModalStore();
        expect(modalStore.show).toBe(false);
    });

    test('open modal function sets show to be true', () => {
        const modalStore = useModalStore();
        modalStore.openModal();
        expect(modalStore.show).toBe(true);
    });

    test('close modal function sets show to be true', () => {
        const modalStore = useModalStore();
        modalStore.closeModal();
        expect(modalStore.show).toBe(false);
    });
});

describe('Modal.vue', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = mount(Modal, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vitest.fn
                })]
            }
        });
        setActivePinia(createPinia());
    });

    test('modal component mounts', () => {
        const wrapper = mount(Modal);
        expect(wrapper.exists()).toBe(true);
    });

    test('modal close button is visible when modal is open', async () => {
        // Mount - previous test shows this works
        const wrapper = mount(Modal);
        // Open the modal to set the v-if to be true, this is tested above
        const modal = useModalStore()
        modal.openModal()
        // Wait for the next tick to allow the DOM to update
        await wrapper.vm.$nextTick()
        // Footer default should find the button if the modal is open
        expect(wrapper.find('#close-modal').exists()).toBe(true);
    });
});