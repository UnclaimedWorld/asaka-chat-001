<template>
  <div class="user-avatar">
    <img :src="data.avatar_url" :alt="data.name" class="user-avatar__image">
    <div>
      <h2 class="user-avatar__name">{{ data.name }}</h2>
      <p class="user-avatar__subtitle">{{ lastOnline }}</p>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue, {PropType} from 'vue';
  import {UserType} from "../types/chat-types";
  import {parseHeaderDate} from "../plugins/helpers/date";
  export default Vue.extend({
    name: 'UserAvatar',
    props: {
      data: Object as PropType<UserType>
    },
    computed: {
      lastOnline(): string {
        return 'last online ' + parseHeaderDate(this.data.last_online);
      },
    }
  })
</script>
<style lang="scss">
  @import '../assets/styles/vars';
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