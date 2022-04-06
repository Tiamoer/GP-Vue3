import { userRequest, mockRequest } from '../request';

/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchSmsCode(phone: string) {
  return userRequest.post<boolean>('/getSmsCode', { phone });
}

/**
 * 登录
 * @param phone - 手机号
 * @param pwdOrCode - 密码或验证码
 * @param type - 登录方式: pwd - 密码登录; sms - 验证码登录
 */
export function fetchLogin(phone: string, pwdOrCode: string, type: 'pwd' | 'sms') {
  if (type === 'pwd') {
    return userRequest.post<ApiAuth.Token>('/loginByPwd', { phone, pwd: pwdOrCode });
  }
  return userRequest.post<ApiAuth.Token>('/loginByCode', { phone, code: pwdOrCode });
}

/** 获取用户信息 */
export function fetchUserInfo(apiToken: ApiAuth.Token) {
  return userRequest.get<ApiAuth.UserInfo>(`/getUserInfo?token=${apiToken.token}`);
}

/**
 * 获取用户路由数据
 * @param userId - 用户id
 * @description 后端根据用户id查询到对应的角色类型，并将路由筛选出对应角色的路由数据返回前端
 */
export function fetchUserRoutes(userId: string) {
  return mockRequest.post<ApiRoute.Route>('/getUserRoutes', { userId });
}

/**
 * 刷新token
 * @param refreshToken
 */
export function fetchUpdateToken(refreshToken: string) {
  return userRequest.post<ApiAuth.Token>('/updateToken', { refreshToken });
}

/**
 * 注册
 * @param name 用户名称
 * @param phone 手机号码
 * @param pwd 密码
 */
export function fetchRegister(name: string, phone: string, pwd: string) {
  return userRequest.post<ApiAuth.Token>('/register', { name, phone, pwd });
}
