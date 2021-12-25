<template>
  <div class="user-avatar-preloader">
    <div class="user-avatar-preloader__image"></div>
    <div class="user-avatar-preloader__wrap">
      <div class="user-avatar-preloader__name"></div>
      <div class="user-avatar-preloader__subtitle"></div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: 'UserAvatarPreloader',
  })
</script>
<style lang="scss">
  @import '../assets/styles/vars';
  @keyframes preloader {
    0% {
      background-color: #eff0f5;
    }
    100% {
      background-color: #e7e8ed;
    }
  }
  .user-avatar-preloader {
    display: flex;
    align-items: center;
    &__wrap {
      flex-grow: 1;
    }
    &__name,
    &__subtitle,
    &__image {
      &:before {
        border-radius: inherit;
        display: block;
        content: '';
        width: 100%;
        height: 100%;
        animation: preloader 1.5s infinite alternate;
      }
    }
    &__name {
      max-width: 300px;
      height: 21px;
      width: 100%;
      margin-bottom: 6px;
    }
    &__subtitle {
      max-width: 200px;
      width: 100%;
      height: 19px;
    }
    &__image {
      margin-right: 20px;
      width: 54px;
      height: 54px;
      border-radius: 100%;
    }
    @media(max-width: $m-mobile) {
      align-items: flex-start;
    }
  }
</style>