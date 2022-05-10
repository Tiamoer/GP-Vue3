import { NButton } from 'naive-ui';
import type { Fn } from '@vueuse/core';

// @ts-ignore
export interface ActionItem extends NButton.props {
  onClick?: Fn;
  label?: string;
  color?: 'success' | 'error' | 'warning';
  icon?: string;
  popConfirm?: boolean;
  disabled?: boolean;
  ifShow?: boolean | ((action: ActionItem) => boolean);
}

export interface PopConfirm {
  title: string;
  okText?: string;
  cancelText?: string;
  confirm: Fn;
  cancel?: Fn;
  icon?: string;
}
