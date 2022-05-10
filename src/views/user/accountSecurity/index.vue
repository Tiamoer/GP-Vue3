<template>
  <div class="h-full">
    <n-card title="用户信息修改" class="h-full shadow-sm rounded-16px" content-style="overflow:hidden">
      <div id="changPwdBox">
        <n-form ref="formRef" :model="model" :rules="rules" label-placement="left" label-width="auto" require-mark-placement="left">
          <n-form-item label="用户名称：" path="username">
            <n-input v-model:value="model.username" placeholder="用户名称" />
          </n-form-item>
          <n-form-item label="手机号码：" path="phone">
            <n-input v-model:value="model.phone" readonly="true" placeholder="手机号码" />
          </n-form-item>
          <n-form-item label="旧的密码：" path="oldPwd">
            <n-input v-model:value="model.oldPwd" placeholder="旧的密码" />
          </n-form-item>
          <n-form-item label="新的密码：" path="newPwd">
            <n-input v-model:value="model.newPwd" placeholder="新的密码" />
          </n-form-item>
          <n-form-item label="确认新密码" path="confirmPwd">
            <n-input v-model:value="model.confirmPwd" placeholder="确认新密码" />
          </n-form-item>
          <login-agreement v-model:value="agreement" />
          <div style="display: flex; justify-content: center; margin-top: 20px">
            <n-button round type="primary" @click="submit">提交</n-button>
          </div>
        </n-form>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import type { FormInst, FormRules } from 'naive-ui';
import { useAuthStore } from '@/store';
import { formRules, getConfirmPwdRule, getUserInfo } from '@/utils';

const { changeUserInfo } = useAuthStore();
const formRef = ref<(HTMLElement & FormInst) | null>(null);
const { userName, userPhone } = getUserInfo();

const model = reactive({
  username: userName,
  phone: userPhone,
  oldPwd: '',
  newPwd: ''
});

const agreement = ref('false');

const rules: FormRules = {
  username: formRules.name,
  phone: formRules.phone,
  oldPwd: formRules.pwd,
  newPwd: formRules.pwd,
  confirmPwd: getConfirmPwdRule(toRefs(model).newPwd)
};

function submit(e: MouseEvent) {
  if (!formRef.value) return;
  e.preventDefault();

  formRef.value.validate(errors => {
    if (!errors) {
      const { username, phone, oldPwd, newPwd } = model;
      if (!agreement.value) return;
      changeUserInfo(username, phone, oldPwd, newPwd);
    } else {
      window.$message?.error('验证失败');
    }
  });
}
</script>

<style scoped>
#changPwdBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
