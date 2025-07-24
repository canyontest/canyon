#!/bin/bash

echo "构建 Canyon Backend Docker 镜像..."

# 构建优化版本（最小体积）
echo "构建优化版本..."
docker build -t canyon-backend:latest .

if [ $? -eq 0 ]; then
    echo "✅ 优化版本构建成功"
    docker images canyon-backend:latest
else
    echo "❌ 优化版本构建失败，尝试简化版本..."
    docker build -f Dockerfile.simple -t canyon-backend:simple .
    
    if [ $? -eq 0 ]; then
        echo "✅ 简化版本构建成功"
        docker images canyon-backend:simple
    else
        echo "❌ 构建失败，请检查网络连接"
        exit 1
    fi
fi

echo "构建完成！"