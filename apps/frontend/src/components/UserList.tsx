import { useState, useEffect } from 'react';
import { apiService, User } from '../services/api';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  // 获取用户列表
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiService.getUsers();
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('获取用户列表失败');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // 创建用户
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      alert('请填写完整信息');
      return;
    }

    try {
      await apiService.createUser(newUser);
      setNewUser({ name: '', email: '' });
      fetchUsers(); // 重新获取列表
    } catch (err) {
      alert('创建用户失败');
      console.error('Error creating user:', err);
    }
  };

  // 测试连接
  const testConnection = async () => {
    try {
      const response = await apiService.ping();
      alert(`连接成功: ${response.data.message}`);
    } catch (err) {
      alert('连接失败');
      console.error('Connection test failed:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>加载中...</div>;
  if (error) return <div style={{ color: 'red' }}>错误: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>用户管理</h2>
      
      <button onClick={testConnection} style={{ marginBottom: '20px' }}>
        测试后端连接
      </button>

      {/* 创建用户表单 */}
      <form onSubmit={handleCreateUser} style={{ marginBottom: '20px' }}>
        <h3>添加新用户</h3>
        <div>
          <input
            type="text"
            placeholder="姓名"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            style={{ margin: '5px', padding: '5px' }}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="邮箱"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            style={{ margin: '5px', padding: '5px' }}
          />
        </div>
        <button type="submit" style={{ margin: '5px', padding: '5px 10px' }}>
          添加用户
        </button>
      </form>

      {/* 用户列表 */}
      <h3>用户列表</h3>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>姓名</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>邮箱</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}