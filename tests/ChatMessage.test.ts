import { shallowMount } from "@vue/test-utils";
import ChatMessage from "../src/components/ChatMessage.vue";

test('renders message', () => {
  const message = 'Hello World';
  const wrapper = shallowMount(ChatMessage, {
    propsData: {
      data: {
        id: 1,
        user_id: 2,
        message,
        created_at: new Date().toString(),
      }
    }
  });

  expect(wrapper.find('[data-test=text-1]').text()).toBe(message);
});
test('renders message with date', () => {
  const message = 'Hello World';
  const wrapper = shallowMount(ChatMessage, {
    propsData: {
      data: {
        id: 1,
        user_id: 2,
        message,
        created_at: new Date().toString(),
      },
      dateVisible: true
    }
  });

  expect(wrapper.find('[data-test=text-2]').exists()).toBe(true);
});
