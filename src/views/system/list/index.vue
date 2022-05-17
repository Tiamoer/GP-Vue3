<template>
  <div class="h-full">
    <n-card title="系统列表" class="h-full shadow-sm rounded-16px" content-style="overflow:hidden">
      <div style="width: 100%; padding-bottom: 10px; text-align: right">
        <n-button type="info" style="color: white" @click="showModel = true">新建</n-button>
      </div>
      <n-data-table ref="table" :columns="columns" :loading="loading" :data="tableData" :row-key="row => row.SYSTEM_NAME" />
      <n-modal
        v-model:show="showModel"
        :mask-closable="false"
        class="custom-card"
        preset="card"
        :style="bodyStyle"
        title="新建系统"
        size="huge"
        :bordered="false"
      >
        <n-form ref="formRef" :label-width="80" :model="sysForm" label-placement="left" :rules="rules" :size="size">
          <n-form-item label="系统名称" path="systemName">
            <n-input v-model:value="sysForm.systemName" placeholder="Debian 10x" />
          </n-form-item>
          <n-form-item label="系统地址" path="systemHost">
            <n-input v-model:value="sysForm.systemHost" placeholder="127.0.0.1" />
          </n-form-item>
          <n-form-item label="端口" path="systemPort">
            <n-input v-model:value="sysForm.systemPort" placeholder="22" />
          </n-form-item>
          <n-form-item label="用户名" path="systemUsername">
            <n-input v-model:value="sysForm.systemUsername" placeholder="root" />
          </n-form-item>
          <n-form-item label="密码" path="systemPassword">
            <n-input v-model:value="sysForm.systemPassword" placeholder="123456" />
          </n-form-item>
          <n-form-item>
            <n-button style="margin: 0 auto" attr-type="button" @click="handleSave">保存</n-button>
          </n-form-item>
        </n-form>
      </n-modal>

      <n-modal
        v-model:show="showEditModel"
        :mask-closable="false"
        class="custom-card"
        preset="card"
        :style="bodyStyle"
        title="编辑系统"
        size="huge"
        :bordered="false"
      >
        <n-form ref="sysEditRef" :label-width="80" :model="sysEditForm" label-placement="left" :rules="rules" :size="size">
          <n-form-item label="系统名称" path="systemName">
            <n-input v-model:value="sysEditForm.SYSTEM_NAME" />
          </n-form-item>
          <n-form-item label="系统地址" path="systemHost">
            <n-input v-model:value="sysEditForm.SYSTEM_HOST" />
          </n-form-item>
          <n-form-item label="端口" path="systemPort">
            <n-input v-model:value="sysEditForm.SYSTEM_PORT" />
          </n-form-item>
          <n-form-item label="用户名" path="systemUsername">
            <n-input v-model:value="sysEditForm.SYSTEM_USERNAME" />
          </n-form-item>
          <n-form-item label="密码" path="systemPassword">
            <n-input v-model:value="sysEditForm.SYSTEM_PASSWORD" />
          </n-form-item>
          <n-form-item>
            <n-button style="margin: 0 auto" attr-type="button" @click="handleEditSave">保存</n-button>
          </n-form-item>
        </n-form>
      </n-modal>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { h, reactive, ref } from 'vue';
import TableAction from '@/components/table/TableAction.vue';
import { addSystem, deleteSys, editSysInfo, getSysInfo, getSysList } from "@/service/api/systemApi";

interface SystemType {
  ID: number;
  SYSTEM_NAME: string;
  SYSTEM_HOST: string;
  SYSTEM_PORT: number;
  SYSTEM_USERNAME: string;
}

const loading = ref(true);

const showModel = ref(false);
const showEditModel = ref(false);

const bodyStyle = ref({
  width: '600px'
});

const sysForm = reactive({
  systemName: '',
  systemHost: '',
  systemPort: 22,
  systemUsername: '',
  systemPassword: ''
});

const sysEditForm = reactive({
  ID: NaN,
  SYSTEM_NAME: '',
  SYSTEM_HOST: '',
  SYSTEM_PORT: NaN,
  SYSTEM_USERNAME: '',
  SYSTEM_PASSWORD: ''
});

const columns = [
  {
    type: 'selection'
  },
  {
    title: '系统名称',
    align: 'center',
    key: 'SYSTEM_NAME'
  },
  {
    title: '系统地址',
    align: 'center',
    key: 'SYSTEM_HOST'
  },
  {
    title: '连接端口',
    align: 'center',
    key: 'SYSTEM_PORT'
  },
  {
    title: '连接用户',
    align: 'center',
    key: 'SYSTEM_USERNAME'
  },
  {
    title: '操作',
    align: 'center',
    render(row: SystemType) {
      function createActions(row: SystemType) {
        return [
          {
            label: '删除',
            type: 'error',
            ghost: true,
            onClick: handleDelete.bind(null, row)
          },
          {
            label: '编辑',
            type: 'warning',
            ghost: true,
            onClick: handleEdit.bind(null, row)
          }
        ];
      }
      // 此处交叉运算 类型有问题 有待查看
      return h(TableAction, {
        style: 'button',
        actions: createActions(row)
      });
    }
  }
];

handleTableData();

const tableData: any = ref([]);

async function handleDelete(row: SystemType) {
  window.$dialog?.warning({
    title: '警告',
    content: `是否删除服务器${row.SYSTEM_NAME}？此操作不可回滚，请谨慎操作！`,
    positiveText: '删除',
    negativeText: '取消',
    onPositiveClick: async () => {
      const { data } = await deleteSys(row.ID);
      if (data === 1) {
        window.$message?.success(`服务器 ${row.SYSTEM_NAME} 已删除!`);
        tableData.value = [];
        await handleTableData();
        return true;
      }
      return false;
    },
    onNegativeClick: () => {}
  });
}

async function handleEdit(row: SystemType) {
  showEditModel.value = true;
  const { data } = await getSysInfo(row.ID);
  sysEditForm.ID = data[0].ID;
  sysEditForm.SYSTEM_USERNAME = data[0].SYSTEM_USERNAME;
  sysEditForm.SYSTEM_NAME = data[0].SYSTEM_NAME;
  sysEditForm.SYSTEM_HOST = data[0].SYSTEM_HOST;
  sysEditForm.SYSTEM_PORT = data[0].SYSTEM_PORT;
  sysEditForm.SYSTEM_PASSWORD = data[0].SYSTEM_PASSWORD;
}

async function handleSave() {
  const { systemName, systemHost, systemPort, systemUsername, systemPassword } = sysForm;
  const { data } = await addSystem(systemName, systemHost, systemPort, systemUsername, systemPassword);
  console.log(data);
  if (data === 1) {
    tableData.value = [];
    window.$message?.success(`服务器${systemName}添加成功!`);
    await handleTableData();
    showModel.value = false;
  }
}

async function handleEditSave() {
  const { ID, SYSTEM_NAME, SYSTEM_HOST, SYSTEM_PORT, SYSTEM_USERNAME, SYSTEM_PASSWORD } = sysEditForm;
  const { data } = await editSysInfo(ID, SYSTEM_NAME, SYSTEM_HOST, SYSTEM_PORT, SYSTEM_USERNAME, SYSTEM_PASSWORD);
  if (data === 1) {
    tableData.value = [];
    window.$message?.success('信息修改成功!');
    setTimeout(() => {
      showEditModel.value = false;
    }, 2000);
    await handleTableData();
  }
}

async function handleTableData() {
  await getSysList().then(res => {
    tableData.value = res.data;
    loading.value = false;
  });
}
</script>

<style scoped></style>
