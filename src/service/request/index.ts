import { createRequest } from './request';
import { serviceEnv } from '~/.env-config';

const { VITE_HTTP_ENV = 'test' } = import.meta.env;

const { url } = serviceEnv[VITE_HTTP_ENV];

export const request = createRequest({ baseURL: 'http://localhost:8001' });

export const mockRequest = createRequest({ baseURL: '/mock' });

// UserApi 请求对象
export const userRequest = createRequest({ baseURL: 'http://localhost:8001/user' });

// SysApi 请求对象
export const sysRequest = createRequest({ baseURL: 'http://localhost:8001/sys' });

// LogApi 请求对象
export const logRequest = createRequest({ baseURL: 'http://localhost:8001/log' });

// OptionApi 请求对象
export const optionRequest = createRequest({ baseURL: 'http://localhost:8001/option' });
