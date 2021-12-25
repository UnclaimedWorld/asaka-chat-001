import { shallowMount } from "@vue/test-utils";
import ChatWindow from "../src/components/ChatWindow.vue";

test('ChatWindow', () => {
  const wrapper = shallowMount(ChatWindow)

  // should not allow for `username` less than 7 characters, excludes whitespace
  wrapper.setData({ username: ' '.repeat(7) })

  // assert the error is rendered
  expect(wrapper.find('.error').exists()).toBe(true)

  // update the name to be long enough
  wrapper.setData({ username: 'Lachlan' })

  // assert the error has gone away
  expect(wrapper.find('.error').exists()).toBe(false)
});