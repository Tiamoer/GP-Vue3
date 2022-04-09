<template>
  <n-dropdown :options="options" @select="handleDropdown">
    <hover-container class="px-12px">
      <icon-custom-avatar class="text-32px" />
      <span class="pl-8px text-16px font-medium">{{ auth.userInfo.userName }}</span>
    </hover-container>
  </n-dropdown>
</template>

<script lang="ts" setup>
import { HoverContainer } from '@/components';
import { router } from '@/router';
import { useAuthStore } from '@/store';
import { useRouterPush } from '@/composables';
import { iconifyRender } from '@/utils';

type DropdownKey = 'user-center' | 'logout';

const auth = useAuthStore();

const options = [
  {
    label: '修改密码',
    key: 'user-center',
    icon: iconifyRender('carbon:user-avatar')
  },
  {
    type: 'divider',
    key: 'divider'
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: iconifyRender('carbon:logout')
  }
];

function handleDropdown(optionKey: string) {
  const key = optionKey as DropdownKey;
  if (key === 'logout') {
    window.$dialog?.info({
      title: '提示',
      content: '您确定要退出登录吗？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        auth.resetAuthStore();
      }
    });
  }
  if (key === 'user-center') {
    window.$message?.create('哇呜！！');
    const { routerPush } = useRouterPush(false);
    routerPush('/user/accountSecurity');
  }
}
</script>
<style scoped></style>
