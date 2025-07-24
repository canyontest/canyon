package main

import (
	"backend/handlers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	// 创建 Gin 路由器
	r := gin.Default()

	// 添加 CORS 中间件
	r.Use(middleware.CORS())

	// 健康检查端点
	r.GET("/health", handlers.HealthCheck)

	// API 路由组
	api := r.Group("/api/v1")
	{
		api.GET("/ping", handlers.Ping)
	}

	// 启动服务器，默认端口 8080
	r.Run(":8080")
}