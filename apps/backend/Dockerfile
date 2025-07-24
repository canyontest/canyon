# 构建阶段
FROM golang:1.22-alpine AS builder

# 更新包索引并安装必要的构建工具
RUN apk update && apk add --no-cache ca-certificates tzdata

# 设置工作目录
WORKDIR /app

# 复制 go mod 文件
COPY go.mod go.sum ./

# 下载依赖
RUN go mod download

# 复制源代码
COPY . .

# 构建二进制文件
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o main .

# 运行阶段
FROM scratch

# 从构建阶段复制必要文件
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=builder /app/main /app/main

# 暴露端口
EXPOSE 8080

# 运行应用
ENTRYPOINT ["/app/main"]