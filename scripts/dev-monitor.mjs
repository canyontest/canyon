#!/usr/bin/env zx

import { chalk } from 'zx'

// 配置
const config = {
  backend: {
    url: 'http://localhost:8080',
    healthPath: '/health',
    apiPath: '/api/v1/ping'
  },
  frontend: {
    url: 'http://localhost:5173',
    path: '/'
  },
  checkInterval: 3000, // 3秒检查一次
  maxRetries: 3
}

// 检查服务状态
async function checkService(name, url, path = '/') {
  try {
    const response = await fetch(`${url}${path}`, {
      method: 'GET',
      timeout: 5000
    })
    
    if (response.ok) {
      return { status: 'healthy', statusCode: response.status }
    } else {
      return { status: 'unhealthy', statusCode: response.status }
    }
  } catch (error) {
    return { status: 'down', error: error.message }
  }
}

// 检查端口是否被占用
async function checkPort(port) {
  try {
    const result = await $`lsof -ti:${port}`.quiet()
    return result.stdout.trim() !== ''
  } catch {
    return false
  }
}

// 获取进程信息
async function getProcessInfo(port) {
  try {
    const result = await $`lsof -ti:${port} | head -1`.quiet()
    const pid = result.stdout.trim()
    if (pid) {
      const processInfo = await $`ps -p ${pid} -o pid,ppid,comm,args --no-headers`.quiet()
      return processInfo.stdout.trim()
    }
  } catch {
    return null
  }
}

// 显示状态
function displayStatus(services) {
  console.clear()
  console.log(chalk.blue.bold('🔍 开发环境监控面板'))
  console.log(chalk.gray('=' .repeat(50)))
  console.log(chalk.yellow(`⏰ 检查时间: ${new Date().toLocaleString()}`))
  console.log()

  services.forEach(service => {
    const statusIcon = service.status === 'healthy' ? '✅' : 
                      service.status === 'unhealthy' ? '⚠️' : '❌'
    
    console.log(`${statusIcon} ${chalk.bold(service.name)}`)
    console.log(`   URL: ${chalk.cyan(service.url)}`)
    console.log(`   状态: ${getStatusText(service.status)}`)
    
    if (service.statusCode) {
      console.log(`   状态码: ${service.statusCode}`)
    }
    
    if (service.processInfo) {
      console.log(`   进程: ${chalk.gray(service.processInfo)}`)
    }
    
    if (service.error) {
      console.log(`   错误: ${chalk.red(service.error)}`)
    }
    
    console.log()
  })
}

function getStatusText(status) {
  switch (status) {
    case 'healthy': return chalk.green('运行正常')
    case 'unhealthy': return chalk.yellow('运行异常')
    case 'down': return chalk.red('服务停止')
    default: return chalk.gray('未知状态')
  }
}

// 主监控函数
async function monitor() {
  console.log(chalk.blue('🚀 启动开发环境监控...'))
  console.log(chalk.gray('按 Ctrl+C 退出监控'))
  console.log()

  while (true) {
    const services = []

    // 检查后端服务
    const backendHealth = await checkService('Backend Health', config.backend.url, config.backend.healthPath)
    const backendApi = await checkService('Backend API', config.backend.url, config.backend.apiPath)
    const backendPort = await checkPort(8080)
    const backendProcess = backendPort ? await getProcessInfo(8080) : null

    services.push({
      name: '后端服务 (Go)',
      url: config.backend.url,
      status: backendHealth.status,
      statusCode: backendHealth.statusCode,
      processInfo: backendProcess,
      error: backendHealth.error
    })

    // 检查前端服务
    const frontendStatus = await checkService('Frontend', config.frontend.url, config.frontend.path)
    const frontendPort = await checkPort(5173)
    const frontendProcess = frontendPort ? await getProcessInfo(5173) : null

    services.push({
      name: '前端服务 (React)',
      url: config.frontend.url,
      status: frontendStatus.status,
      statusCode: frontendStatus.statusCode,
      processInfo: frontendProcess,
      error: frontendStatus.error
    })

    displayStatus(services)

    // 检查是否有服务异常
    const hasIssues = services.some(s => s.status !== 'healthy')
    if (hasIssues) {
      console.log(chalk.yellow('⚠️  检测到服务异常，请检查相关服务状态'))
    }

    await sleep(config.checkInterval)
  }
}

// 环境检查
async function checkEnvironment() {
  console.log(chalk.blue('🔧 检查开发环境...'))
  
  const checks = [
    { name: 'Node.js', command: 'node --version' },
    { name: 'Go', command: 'go version' },
    { name: 'pnpm', command: 'pnpm --version' },
    { name: 'Git', command: 'git --version' }
  ]

  for (const check of checks) {
    try {
      const result = await $`${check.command}`.quiet()
      console.log(`✅ ${check.name}: ${chalk.green(result.stdout.trim())}`)
    } catch {
      console.log(`❌ ${check.name}: ${chalk.red('未安装或不可用')}`)
    }
  }
  
  console.log()
}

// 启动服务
async function startServices() {
  console.log(chalk.blue('🚀 启动开发服务...'))
  
  // 检查服务是否已经运行
  const backendRunning = await checkPort(8080)
  const frontendRunning = await checkPort(5173)
  
  if (backendRunning) {
    console.log(chalk.yellow('⚠️  后端服务已在运行 (端口 8080)'))
  } else {
    console.log('📦 启动后端服务...')
    $`cd apps/backend && go run main.go`.nothrow()
  }
  
  if (frontendRunning) {
    console.log(chalk.yellow('⚠️  前端服务已在运行 (端口 5173)'))
  } else {
    console.log('🎨 启动前端服务...')
    $`cd apps/frontend && pnpm dev`.nothrow()
  }
  
  console.log(chalk.green('✅ 服务启动完成'))
  console.log()
}

// 停止服务
async function stopServices() {
  console.log(chalk.blue('🛑 停止开发服务...'))
  
  try {
    await $`pkill -f "go run main.go"`.nothrow()
    await $`pkill -f "vite"`.nothrow()
    console.log(chalk.green('✅ 服务已停止'))
  } catch {
    console.log(chalk.yellow('⚠️  停止服务时出现问题'))
  }
}

// 主函数
async function main() {
  const command = argv._[0] || 'monitor'
  
  switch (command) {
    case 'check':
      await checkEnvironment()
      break
    case 'start':
      await checkEnvironment()
      await startServices()
      await sleep(3000) // 等待服务启动
      await monitor()
      break
    case 'stop':
      await stopServices()
      break
    case 'monitor':
    default:
      await monitor()
      break
  }
}

// 处理退出信号
process.on('SIGINT', async () => {
  console.log(chalk.yellow('\n🛑 监控已停止'))
  process.exit(0)
})

// 启动
main().catch(console.error)