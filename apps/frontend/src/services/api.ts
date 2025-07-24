// API 基础配置
const API_BASE_URL = '/api/v1';

// 用户接口类型定义
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

// 通用请求函数
async function request<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// API 服务
export const apiService = {
  // 健康检查
  async ping() {
    return request<{ message: string }>('/ping');
  },

  // 获取用户列表
  async getUsers() {
    return request<User[]>('/users');
  },

  // 获取单个用户
  async getUser(id: number) {
    return request<User>(`/users/${id}`);
  },

  // 创建用户
  async createUser(user: Omit<User, 'id'>) {
    return request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  },
};