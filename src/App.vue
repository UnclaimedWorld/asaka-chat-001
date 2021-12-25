<template>
  <div id="app">
    <chat-window :data="chatData" @submit="sendMessage"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ChatWindow from './components/ChatWindow.vue';
import './App.scss';
import { DataType } from "@/types/chat-types";

export default Vue.extend({
  name: 'App',
  components: {
    ChatWindow
  },
  data() {
    return {
      chatData: {
        user_id: 1234,
        me: 3122,
        users_list: [],
        messages: []
      } as DataType,
      socket: null as null | WebSocket,
    }
  },
  created() {
    this.createSocket();
  },
  beforeDestroy() {
    if(this.socket) {
      this.socket.close();
    }
  },
  methods: {
    createSocket() {
      const socket = new WebSocket('wss://asaka-chat-socket-01.herokuapp.com/');
      this.socket = socket;
      socket.onopen = () => {
        socket.onmessage = ({ data }) => {
          const parsed = JSON.parse(data);
          if(parsed.users_list) {
            this.$set(this.chatData, 'users_list', parsed.users_list);
          }
          if(parsed.messages) {
            this.$set(this.chatData, 'messages', parsed.messages);
            this.$nextTick(() => {
              window.scrollTo({
                left: 0,
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
              });
            })
          }
        }
      }
    },
    async sendMessage(message: string) {
      if(this.socket) {
        this.socket.send(message);
      }
    }
  }
});
</script>
