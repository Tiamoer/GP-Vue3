<template>你好</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SystemEdit',
  setup() {
    function f() {
      window.alert('这是测试用的！');
    }
    return {
      f
    };
  }
});
</script>

<style scoped></style>
