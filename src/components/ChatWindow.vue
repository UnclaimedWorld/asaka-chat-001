<template>
  <main class="chat-window">
    <header class="chat-window__header">
      <div class="chat-window__container">
        <div class="chat-window__avatar user-avatar">
          <img :src="companionData.avatar_url" :alt="companionData.name" class="user-avatar__image">
          <div>
            <h2 class="user-avatar__name">{{ companionData.name }}</h2>
            <p class="user-avatar__subtitle">{{ lastOnline }}</p>
          </div>
        </div>
      </div>
    </header>
    <div class="chat-window__container chat-window__body">
      <chat-body class="chat-window__messages" :messages="data.messages" :users-list="data.users_list" :me="data.me"/>
      <chat-form class="chat-window__form" @submit="sendMessage"/>
    </div>
  </main>
</template>
<script lang="ts">
  import Vue, {PropType} from 'vue';
  import ChatForm from "./ChatForm.vue";
  import {DataType, UserType} from "@/types/chat-types";
  import ChatBody from './ChatBody.vue';
  import { parseHeaderDate } from "@/plugins/helpers/date";

  export default Vue.extend({
    name: 'ChatWindow',
    components: {
      ChatForm,
      ChatBody
    },
    props: {
      data: Object as PropType<DataType>
    },
    computed: {
      lastOnline(): string {
        return 'last online ' + parseHeaderDate(this.companionData.last_online);
      },
      companionData(): UserType {
        return this.data.users_list.find(user => user.id === this.data.user_id) || {
          id: -1,
          name: '',
          avatar_url: '',
          last_online: (new Date()).toString(),
        };
      }
    },
    methods: {
      sendMessage(message: string) {
        this.$emit('submit', message);
      }
    }
  })
</script>
<style lang="scss">
  @import '../assets/styles/vars';
  .chat-button {
    transition: box-shadow .25s;
    cursor: pointer;
    user-select: none;
    box-shadow: 4px 4px 25px rgba(42, 139, 242, 0.15), 2px 2px 25px rgba(42, 139, 242, 0.05), 4px 6px 10px rgba(42, 139, 242, 0.15);
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 0;
    padding: 10px;
    position: relative;
    z-index: 0;
    background-color: transparent;
    &:before {
      transition: transform .25s;
      content: '';
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(325.78deg, #2A8BF2 14.76%, #7CB8F7 87.3%);
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    &:hover {
      &:before {
        transform: rotate(180deg);
      }
    }
  }
  .chat-window {
    border-radius: 6px;
    position: relative;
    height: 100vh;
    padding-top: 110px;
    &__container {
      max-width: 762px;
      padding-left: 20px;
      padding-right: 20px;
      margin-left: auto;
      margin-right: auto;
    }
    &__header {
      z-index: 1;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 110px;
      padding: 28px 0;
      background: #FAFBFF;
      border-radius: 6px 6px 0px 0px;
      border-bottom: 2px solid rgba(112, 124, 151, 0.1);
    }
    &__body {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    &__messages {
      flex-grow: 1;
    }
    &__form {
      z-index: 1;
      flex-shrink: 0;
      position: sticky;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 91px;
      background-color: #fff;
    }
    @media(max-width: $m-mobile) {
      padding-top: 88px;
      &__header {
        padding-top: 16px;
        padding-bottom: 0;
        height: 88px;
      }
      &__form {
        margin-left: -20px;
        margin-right: -20px;
        width: calc(100% + 40px);
      }
    }
  }
  .user-avatar {
    display: flex;
    align-items: center;
    &__name {
      width: 100%;
      font-size: 18px;
      line-height: 21px;
      text-transform: capitalize;
      margin-top: 0;
      margin-bottom: 6px;
    }
    &__subtitle {
      font-size: 16px;
      line-height: 19px;
      text-transform: lowercase;
      color: #2A8BF2;
      margin: 0;
    }
    &__image {
      margin-right: 20px;
      width: 54px;
      height: 54px;
      border-radius: 100%;
      box-shadow: 4px 4px 15px rgba(154, 81, 48, 0.05), 2px 2px 10px rgba(154, 81, 48, 0.1), 1px 1px 50px rgba(154, 81, 48, 0.15);
    }
    @media(max-width: $m-mobile) {
      align-items: flex-start;
    }
  }
</style>