#!/bin/bash

# 开发环境启动脚本

echo "🚀 启动开发环境..."

# 检查是否安装了必要的依赖
if ! command -v go &> /dev/null; then
    echo "❌ Go 未安装，请先安装 Go"
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm 未安装，请先安装 pnpm"
    exit 1
fi

# 启动后端服务
echo "📦 启动后端服务..."
cd apps/backend
go mod tidy
go run main.go &
BACKEND_PID=$!
cd ../..

# 等待后端启动
sleep 3

# 启动前端服务
echo "🎨 启动前端服务..."
cd apps/frontend
pnpm install
pnpm dev &
FRONTEND_PID=$!
cd ../..

echo "✅ 开发环境启动完成!"
echo "📱 前端地址: http://localhost:5173"
echo "🔧 后端地址: http://localhost:8080"
echo "📋 API文档: http://localhost:8080/api/v1/ping"

# 等待用户中断
trap "echo '🛑 停止服务...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait