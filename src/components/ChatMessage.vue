<template>
  <div class="chat-message" :class="{ 'chat-message--me': userMe }">
    <div>
      <div class="chat-message__wrap">
        <p class="chat-message__text" data-test="text-1">{{ data.message }}</p>
        <button class="chat-message__more" type="button">
          <img src="../assets/icons/more-horizontal.svg" alt="">
        </button>
        <img v-if="userMe" :src="readIcon" alt="" class="chat-message__read-icon">
      </div>
      <p v-if="dateVisible" class="chat-message__date" data-test="text-2">{{ data.created_at | parseDate }}</p>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue, {PropType} from 'vue';
  import {MessageType} from "../types/chat-types";
  import {parseMessageDate} from "../plugins/helpers/date";

  export default Vue.extend({
    name: 'ChatMessage',
    filters: {
      parseDate: parseMessageDate
    },
    props: {
      data: {
        type: Object as PropType<MessageType>,
        required: true
      },
      dateVisible: Boolean,
      userMe: Boolean
    },
    computed: {
      readIcon(): string {
        return require(this.data.is_read ? '../assets/icons/all-done.svg' : '../assets/icons/checkmark.svg');
      }
    }
  })
</script>
<style lang="scss">
  .chat-message {
    $self: &;
    display: flex;
    flex-wrap: wrap;
    &__wrap {
      width: 100%;
      display: flex;
      align-items: center;
    }
    &__text {
      margin: 0;
      background: linear-gradient(90.54deg, #60A9F6 0%, #2A8BF2 100%);
      box-shadow: 10px 10px 25px rgba(42, 139, 242, 0.1), 15px 15px 35px rgba(42, 139, 242, 0.05), 10px 10px 50px rgba(42, 139, 242, 0.1);
      border-radius: 0px 10px 10px 10px;
      border: 1px solid transparent;
      padding: 14px 21px 17px;
      color: #fff;
      max-width: 520px;
      word-break: break-all;
    }
    &__date {
      width: 100%;
      padding-right: 52px;
      font-size: 14px;
      line-height: 26px;
      text-align: right;
      margin: 0;
      margin-top: 5px;
      color: rgba(112, 124, 151, 0.7);
    }
    &__more {
      box-sizing: content-box;
      padding: 10px;
      width: 24px;
      height: 24px;
      margin-left: 8px;
      background-color: transparent;
      border: 0;
      flex-shrink: 0;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    &__read-icon {
      width: 16px;
      height: 16px;
      margin-left: 13px;
    }
    &--me {
      justify-content: flex-end;
      #{$self}__more {
        order: -1;
        margin-left: 0;
        margin-right: 8px;
      }
      #{$self}__wrap {
        justify-content: flex-end;
      }
      #{$self}__text {
        color: #707C97;
        background: #FFFFFF;
        border: 1px solid rgba(112, 124, 151, 0.25);
        box-shadow: 10px 10px 25px rgba(112, 124, 151, 0.05), 15px 15px 35px rgba(112, 124, 151, 0.05);
        border-radius: 10px 10px 0 10px;
      }
      #{$self}__date {
        padding-right: 29px;
      }
    }
  }
</style>