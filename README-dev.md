# 开发环境使用说明

## 前后端代理配置

### 开发环境
前端通过 Vite 代理配置，将 `/api` 请求代理到后端 `http://localhost:8080`

### 生产环境 (Docker)
通过 nginx 配置，将 `/api/` 请求代理到后端服务

## 启动开发环境

### 方式一：使用启动脚本
```bash
chmod +x dev-start.sh
./dev-start.sh
```

### 方式二：手动启动

1. 启动后端服务：
```bash
cd apps/backend
go mod tidy
go run main.go
```

2. 启动前端服务（新终端）：
```bash
cd apps/frontend
pnpm install
pnpm dev
```

## 访问地址

- 前端：http://localhost:5173
- 后端：http://localhost:8080
- API测试：http://localhost:8080/api/v1/ping

## API 接口

### 用户相关接口

- `GET /api/v1/users` - 获取用户列表
- `GET /api/v1/users/:id` - 获取单个用户
- `POST /api/v1/users` - 创建用户

### 测试接口

- `GET /api/v1/ping` - 连接测试
- `GET /health` - 健康检查

## 前后端交互演示

在前端页面点击"显示前后端交互演示"按钮，可以：

1. 测试后端连接
2. 查看用户列表
3. 添加新用户
4. 实时查看前后端数据交互

## Docker 部署

```bash
# 构建镜像
docker build -t your-app .

# 运行容器
docker run -p 80:80 your-app
```

访问 http://localhost 即可看到完整应用。