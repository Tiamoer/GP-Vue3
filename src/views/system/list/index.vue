<template>
  <div class="h-full">
    <n-card title="系统列表" class="h-full shadow-sm rounded-16px" content-style="overflow:hidden">
      <n-data-table ref="table" :columns="columns" :data="data" :row-key="row => row.systemName" />
      <n-modal v-model:show="showModel" class="custom-card" preset="card" title="卡片预设" size="huge" :bordered="true">
        ppppppppppp
      </n-modal>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import {h, reactive, ref} from 'vue';
import TableAction from '@/components/table/TableAction.vue';

interface SystemType {
  SystemName: string;
}

const columns = [
  {
    type: 'selection'
  },
  {
    title: '系统名称',
    align: 'center',
    key: 'systemName'
  },
  {
    title: '系统地址',
    align: 'center',
    key: 'systemHost'
  },
  {
    title: '连接端口',
    align: 'center',
    key: 'systemPort'
  },
  {
    title: '连接用户',
    align: 'center',
    key: 'systemUsername'
  },
  {
    title: '操作',
    align: 'center',
    render(record: SystemType) {
      function createActions(record: SystemType) {
        return [
          {
            label: '删除',
            type: 'error',
            ghost: true,
            onClick: handleDelete.bind(null, record)
          },
          {
            label: '编辑',
            type: 'warning',
            ghost: true,
            // onClick: handleEdit.bind(null, record)
            onClick: () => {
              window.$message?.info('编辑按钮被点击');
            }
          }
        ];
      }
      // 此处交叉运算 类型有问题 有待查看
      return h(TableAction, {
        style: 'button',
        actions: createActions(record)
      });
    }
  }
];

const data = [
  {
    systemName: '测试系统1',
    systemHost: '127.0.0.1',
    systemPort: 22,
    systemUsername: 'root'
  }
];

function handleDelete(row: any) {
  window.$message?.warning(`删除${row.systemName}`);
}

function handleEdit(row: any) {
  showModel = true;
  window.$message?.info(`编辑${row.systemName}`);
}
</script>

<style scoped></style>
