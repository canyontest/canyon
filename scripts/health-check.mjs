#!/usr/bin/env zx

import { chalk } from 'zx'

// 快速健康检查
async function quickHealthCheck() {
  console.log(chalk.blue.bold('🏥 快速健康检查'))
  console.log(chalk.gray('=' .repeat(30)))
  
  const checks = [
    {
      name: '后端健康检查',
      url: 'http://localhost:8080/health',
      expected: 'ok'
    },
    {
      name: '后端API测试',
      url: 'http://localhost:8080/api/v1/ping',
      expected: 'pong'
    },
    {
      name: '前端服务',
      url: 'http://localhost:5173',
      expected: null
    }
  ]

  for (const check of checks) {
    try {
      const response = await fetch(check.url, { timeout: 3000 })
      
      if (response.ok) {
        let result = '✅'
        
        if (check.expected) {
          const data = await response.json()
          const hasExpected = JSON.stringify(data).includes(check.expected)
          result = hasExpected ? '✅' : '⚠️'
        }
        
        console.log(`${result} ${check.name}: ${chalk.green('正常')} (${response.status})`)
      } else {
        console.log(`❌ ${check.name}: ${chalk.red('异常')} (${response.status})`)
      }
    } catch (error) {
      console.log(`❌ ${check.name}: ${chalk.red('无法连接')}`)
    }
  }
}

// 端口检查
async function checkPorts() {
  console.log()
  console.log(chalk.blue.bold('🔌 端口占用检查'))
  console.log(chalk.gray('=' .repeat(30)))
  
  const ports = [
    { port: 8080, service: '后端服务' },
    { port: 5173, service: '前端服务' }
  ]

  for (const { port, service } of ports) {
    try {
      const result = await $`lsof -ti:${port}`.quiet()
      if (result.stdout.trim()) {
        const processInfo = await $`ps -p ${result.stdout.trim()} -o comm --no-headers`.quiet()
        console.log(`✅ ${service}: ${chalk.green('运行中')} (${processInfo.stdout.trim()})`)
      } else {
        console.log(`❌ ${service}: ${chalk.red('未运行')}`)
      }
    } catch {
      console.log(`❌ ${service}: ${chalk.red('未运行')}`)
    }
  }
}

// 依赖检查
async function checkDependencies() {
  console.log()
  console.log(chalk.blue.bold('📦 依赖检查'))
  console.log(chalk.gray('=' .repeat(30)))
  
  const deps = [
    { name: 'Go', cmd: 'go version', path: 'apps/backend' },
    { name: 'Node.js', cmd: 'node --version', path: '.' },
    { name: 'pnpm', cmd: 'pnpm --version', path: '.' }
  ]

  for (const dep of deps) {
    try {
      const result = await $`${dep.cmd}`.quiet()
      console.log(`✅ ${dep.name}: ${chalk.green(result.stdout.trim())}`)
    } catch {
      console.log(`❌ ${dep.name}: ${chalk.red('未安装')}`)
    }
  }
}

// 主函数
async function main() {
  await quickHealthCheck()
  await checkPorts()
  await checkDependencies()
  
  console.log()
  console.log(chalk.blue('💡 提示:'))
  console.log('  - 使用 `zx scripts/dev-monitor.mjs` 启动实时监控')
  console.log('  - 使用 `zx scripts/dev-monitor.mjs start` 启动服务并监控')
  console.log('  - 使用 `zx scripts/dev-monitor.mjs stop` 停止所有服务')
}

main().catch(console.error)