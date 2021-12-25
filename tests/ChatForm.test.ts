import { shallowMount } from "@vue/test-utils";
import ChatForm from "../src/components/ChatForm.vue";

test('renders form', () => {
  const wrapper = shallowMount(ChatForm );

  expect(wrapper.find('[data-test=input-1]').exists()).toBe(true);
});
test('check if form works', async () => {
  const wrapper = shallowMount(ChatForm );

  await wrapper.find('[data-test=input-1]').setValue('Hello World');

  expect(wrapper.vm.$data.text).toBe('Hello World');


  await wrapper.find('[data-test=form-1]').trigger('submit');

  expect(wrapper.emitted().submit).toBeTruthy();
});
