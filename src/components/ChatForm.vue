<template>
  <form class="chat-form" @submit.prevent="submit">
    <textarea v-model="text" class="chat-form__input" placeholder="Type a message here" autofocus></textarea>
    <div class="chat-form__buttons-wrap">
      <button class="chat-button" type="submit">
        <img src="../assets/icons/navigation.svg" alt="">
      </button>
    </div>
  </form>
</template>
<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: 'ChatForm',
    data() {
      return {
        text: ''
      }
    },
    mounted() {
      document.addEventListener('keypress', (e) => {
        if(e.ctrlKey && e.code === 'Enter') {
          this.submit();
        }
      })
    },
    methods: {
      submit() {
        if(!this.text) return;
        this.$emit('submit', this.text);
        this.text = '';
      }
    }
  });
</script>
<style lang="scss">
  @import '../assets/styles/vars';
  .chat-form {
    border-top: 2px solid rgba(112, 124, 151, 0.1);
    position: relative;
    &__input {
      $placeholder-color: rgba(112, 124, 151, 0.5);
      background-color: transparent;
      padding: 27px 60px 38px 0;
      height: 100%;
      width: 100%;
      border: 0;
      font-size: 20px;
      line-height: 24px;
      resize: none;
      &::placeholder { color: $placeholder-color; }
      &:-moz-placeholder { color: $placeholder-color; }
      &:-ms-input-placeholder { color: $placeholder-color; }
      &::-webkit-input-placeholder { color: $placeholder-color; }
    }
    &__buttons-wrap {
      position: absolute;
      top: 19px;
      right: 0;
    }
    @media (max-width: $m-mobile) {
      &__input {
        padding-left: 20px;
        padding-right: 20px;
      }
      &__buttons-wrap {
        right: 20px;
      }
    }
  }
</style>