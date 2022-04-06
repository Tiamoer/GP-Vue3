<template>
  <h1 style="font-size: 72px">后端验证码</h1>
  <div>
    <span>{{ code }}</span>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';

axios
  .get('http://localhost:8080')
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    console.log(error);
  });

interface Props {
  value: string;
}

defineProps<Props>();
</script>

<style scoped>
h1 {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  font-size: 56px;
  color: white;
}

div {
  color: white;
  border-radius: 10px;
  border: 2px solid white;
  width: 60%;
  height: 200px;
  text-align: center;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

div > span {
  font-size: 100px;
  line-height: 200px;
  letter-spacing: 30px;
}
</style>
