# Backend Service

基于 Go 和 Gin 框架的后端服务。

## 安装 Go

如果你还没有安装 Go，请访问 [https://golang.org/dl/](https://golang.org/dl/) 下载并安装。

## 运行服务

### 本地开发

1. 安装依赖：
```bash
go mod tidy
```

2. 运行开发服务器：
```bash
nx run backend:dev
```

或者直接运行：
```bash
go run main.go
```

### Docker 部署

1. 构建 Docker 镜像：
```bash
docker build -t canyon-backend .
```

2. 运行容器：
```bash
docker run -p 8080:8080 canyon-backend
```

3. 或使用 Docker Compose：
```bash
docker-compose up -d
```

## API 端点

- `GET /health` - 健康检查
- `GET /api/v1/ping` - 测试端点

服务默认运行在 `http://localhost:8080`