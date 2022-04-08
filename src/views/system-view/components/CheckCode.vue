<template>
  <h1 style="font-size: 72px">后端验证码</h1>
  <div>
    <span>{{ code }}</span>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'CheckCode',
  setup() {
    let code: string = ref('11111');
    onMounted(() => {
      axios.get('http://127.0.0.1:8001/user/getCode').then(res => {
        console.log(res.data.data);
        code.value = res.data.data as string;
      });
    });
    return {
      code
    };
  }
};
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
