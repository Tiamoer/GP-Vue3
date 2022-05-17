import { sysRequest } from '@/service/request';

export function addSystem(
  systemName: string,
  systemHost: string,
  systemPort: number,
  systemUsername: string,
  systemPassword: string
) {
  return sysRequest.post('/add', { systemName, systemHost, systemPort, systemUsername, systemPassword });
}

export function getSysList() {
  return sysRequest.get('getSystemList');
}

export function getSysInfo(sysId: number) {
  return sysRequest.get(`getSystemInfo?sysId=${sysId}`);
}

export function editSysInfo(
  ID: number,
  SYSTEM_NANE: string,
  SYSTEM_HOST: string,
  SYSTEM_PORT: number,
  SYSTEM_USERNAME: string,
  SYSTEM_PASSWORD: string
) {
  return sysRequest.post('/edit', { ID, SYSTEM_NANE, SYSTEM_HOST, SYSTEM_PORT, SYSTEM_USERNAME, SYSTEM_PASSWORD });
}

export function deleteSys(sysId: number) {
  return sysRequest.get(`/delete?sysId=${sysId}`);
}
