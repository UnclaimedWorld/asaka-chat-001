<template>
  <form class="chat-form" @submit.prevent="submit" data-test="form-1">
    <textarea
      :value="text"
      class="chat-form__input"
      placeholder="Type a message here"
      autofocus
      data-test="input-1"
      :style="{ height: height + 'px' }"
      ref="input"
      @input="onInput"
    ></textarea>
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
      const defaultHeight = 89;
      return {
        text: '',
        height: defaultHeight,
        defaultHeight
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
      async checkHeight() {
        this.height = this.defaultHeight;
        await this.$nextTick();
        this.height = Math.min((this.$refs.input as HTMLTextAreaElement).scrollHeight, 220);
      },
      async onInput(e: InputEvent) {
        if(e.target) {
          const value = (e.target as HTMLTextAreaElement).value;
          this.checkHeight();
          this.text = value;
        }
      },
      submit() {
        if(!this.text) return;
        this.$emit('submit', this.text);
        this.text = '';
        this.checkHeight();
      }
    }
  });
</script>
<style lang="scss">
  @import '../assets/styles/vars';
  .chat-form {
    border-top: 2px solid rgba(112, 124, 151, 0.1);
    position: relative;
    min-height: 91px;
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