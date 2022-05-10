<template>
  <div>
    <div class="flex items-center justify-center">
      <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
        <n-button v-bind="action" class="mx-2">{{ action.label }}</n-button>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRaw } from 'vue';
import type { PropType } from 'vue';
import type { ActionItem } from '@/components/table/types/tableAction';

export default defineComponent({
  name: 'TableAction',
  props: {
    actions: {
      type: Array as PropType<ActionItem[]>,
      default: null,
      required: true
    },
    style: {
      type: String as PropType<String>,
      default: 'button'
    }
  },
  setup(props) {
    const actionType = props.style === 'button' ? 'defailt' : props.style === 'text' ? 'primary' : 'default';
    const actionText = props.style === 'button' ? undefined : props.style === 'text' ? true : undefined;
    const getMoreProps = computed(() => {
      return {
        text: actionText,
        type: actionType,
        size: 'small'
      };
    });

    const getActions = computed(() => {
      return (toRaw(props.actions) || []).map(action => {
        const { popConfirm } = action;
        return {
          size: 'small',
          text: actionText,
          type: actionType,
          ...action,
          ...(popConfirm || {}),
          onConfirm: popConfirm?.confirm,
          onCancel: popConfirm?.cancel,
          enable: !!popConfirm
        };
      });
    });

    return {
      getActions,
      getMoreProps
    };
  }
});
</script>

<style scoped></style>
