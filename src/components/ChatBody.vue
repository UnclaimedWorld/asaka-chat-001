<template>
  <div class="chat-body">
    <div v-for="message in parsedMessages" :key="message.id" class="chat-body__wrap">
      <img
        v-if="message.user_id !== me"
        class="chat-body__avatar"
        :class="{'chat-body__avatar--sticky': message.messages.length > 1}"
        :src="message.avatar_url"
        alt=""
      >
      <div class="chat-body__message-group">
        <chat-message
          v-for="(item, idx) in message.messages"
          :key="item.id"
          class="chat-body__message"
          :data="item"
          :date-visible="idx === message.messages.length - 1"
          :user-me="message.user_id === me"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue, {PropType} from 'vue';
  import {MessageType, UserType} from "../types/chat-types";
  import ChatMessage from './ChatMessage.vue';

  export default Vue.extend({
    name: 'ChatBody',
    components: {
      ChatMessage
    },
    props: {
      me: Number,
      messages: {
        type: Array as PropType<Array<MessageType>>,
        required: true
      },
      usersList: {
        type: Array as PropType<Array<UserType>>,
        required: true
      }
    },
    computed: {
      parsedMessages(): any {
        type MessageGroup = Array<{
          id: number,
          user_id: number,
          avatar_url: string,
          created_at: Date,
          messages: Array<MessageType>,
        }>;

        type ParsedUsersType = {
          [key: number]: UserType
        };

        const parsedUsers = this.usersList.reduce((acc: ParsedUsersType, curr: UserType) => {
          acc[curr.id] = curr;
          return acc;
        }, {});

        return this.messages.reduce((acc: MessageGroup, curr: MessageType, idx: number) => {
          const { avatar_url, id: user_id } = parsedUsers[curr.user_id];
          const nextObj = {
            id: idx,
            user_id,
            avatar_url,
            created_at: curr.created_at,
            messages: [curr]
          };
          if(!acc.length) return [nextObj];

          const lastObj = acc[acc.length - 1];

          if(user_id === lastObj.user_id) {
            lastObj.messages.push(curr);
          } else {
            acc.push(nextObj);
          }
          return acc;
        }, []);
      }
    }
  })
</script>
<style lang="scss">
  @import '../assets/styles/vars';
  .message {
    &-enter-active, &-leave-active {
      transition: opacity .25s;
    }
    &-enter, &-leave-to {
      opacity: 0;
    }
  }
  .chat-body {
    padding: 30px 0;
    &__wrap {
      display: flex;
      align-items: flex-start;
    }
    &__avatar {
      filter: drop-shadow(4px 4px 15px rgba(154, 81, 48, 0.05)) drop-shadow(2px 2px 10px rgba(154, 81, 48, 0.1)) drop-shadow(1px 1px 50px rgba(154, 81, 48, 0.15));
      border-radius: 100px;
      width: 36px;
      height: 36px;
      margin-right: 24px;
      &--sticky {
        position: sticky;
        top: 126px;
      }
    }
    &__message {
      margin-bottom: 15px;
    }
    &__message-group {
      flex-grow: 1;
    }
    @media(max-width: $m-mobile) {
      &__avatar {
        display: none;
      }
    }
  }
</style>