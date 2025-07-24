package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// User 用户结构体
type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

// 模拟用户数据
var users = []User{
	{ID: 1, Name: "张三", Email: "zhangsan@example.com"},
	{ID: 2, Name: "李四", Email: "lisi@example.com"},
	{ID: 3, Name: "王五", Email: "wangwu@example.com"},
}

// GetUsers 获取用户列表
func GetUsers(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"data": users,
		"message": "获取用户列表成功",
	})
}

// GetUser 获取单个用户
func GetUser(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code": 400,
			"message": "无效的用户ID",
		})
		return
	}

	for _, user := range users {
		if user.ID == id {
			c.JSON(http.StatusOK, gin.H{
				"code": 200,
				"data": user,
				"message": "获取用户成功",
			})
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{
		"code": 404,
		"message": "用户不存在",
	})
}

// CreateUser 创建用户
func CreateUser(c *gin.Context) {
	var newUser User
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code": 400,
			"message": "请求参数错误",
		})
		return
	}

	// 生成新ID
	newUser.ID = len(users) + 1
	users = append(users, newUser)

	c.JSON(http.StatusCreated, gin.H{
		"code": 201,
		"data": newUser,
		"message": "创建用户成功",
	})
}