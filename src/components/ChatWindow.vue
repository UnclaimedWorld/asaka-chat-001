<template>
  <main class="chat-window">
    <header class="chat-window__header">
      <div class="chat-window__container">
        <user-avatar-preloader v-if="disabled" class="chat-window__avatar"/>
        <user-avatar v-else class="chat-window__avatar" :data="companionData"/>
      </div>
    </header>
    <div class="chat-window__container chat-window__body">
      <div class="chat-window__messages">
        <img v-if="disabled" class="chat-window__loading" src="../assets/icons/loading.svg" alt="">
        <div v-else-if="!data.messages.length" class="chat-window__no-messages">Oops, here is nothing. You can type your message first.</div>
        <chat-body v-else :messages="data.messages" :users-list="data.users_list" :me="data.me"/>
      </div>
      <chat-form class="chat-window__form" @submit="sendMessage"/>
    </div>
  </main>
</template>
<script lang="ts">
  import Vue, {PropType} from 'vue';
  import ChatForm from "./ChatForm.vue";
  import {DataType, UserType} from "../types/chat-types";
  const ChatBody = () => import('./ChatBody.vue');
  const UserAvatar = () => import("./UserAvatar.vue");
  const UserAvatarPreloader = () => import("./UserAvatarPreloader.vue");

  export default Vue.extend({
    name: 'ChatWindow',
    components: {
      ChatForm,
      ChatBody,
      UserAvatar,
      UserAvatarPreloader,
    },
    props: {
      data: Object as PropType<DataType>,
      disabled: Boolean
    },
    computed: {
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
    padding-top: 110px;
    &__no-messages {
      font-size: 18px;
      line-height: 21px;
      margin: 24px 0;
    }
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
    &__loading {
      margin: auto;
      display: block;
      width: 54px;
      height: 100%;
    }
    &__form {
      z-index: 1;
      flex-shrink: 0;
      position: sticky;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
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
</style>