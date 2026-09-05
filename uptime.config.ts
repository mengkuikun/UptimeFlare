// 这是一个用于快速上手的简化示例配置文件
// 一些不常用的功能在这里被省略或注释
// 完整示例请参考 `uptime.config.full.ts`

// 不要编辑这一行
import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // 状态页的标题
  title: "mengku's Status Page",
  // 头部显示的链接，可以通过 highlight 突出显示
  links: [
    { link: 'https://github.com/mengkuikun', label: 'GitHub' },
    { link: 'https://250031.xyz/', label: 'Blog' },
    { link: 'mailto:mengku625@gmail.com', label: 'Email Me', highlight: true },
  ],
  // 分组显示监控；未列出的监控将隐藏但仍会被监测
  group: {
    '🌐 Public': ['www', 'blog', 'pan', 'pan_backup', 'libretv'],
    '🔐 Private': ['routerssh', 'homelab', 'miscvps'],
  },
  // 维护提示相关设置
  maintenances: {
    upcomingColor: 'gray',
  },
}

const workerConfig: WorkerConfig = {
  // 写入 KV 的最小间隔（分钟），除非状态有变更
  kvWriteCooldownMinutes: 3,
  monitors: [
    {
      // id 应唯一，保持不变可保留历史
      id: 'www',
      // name 用于状态页和回调消息
      name: 'My Personal Website',
      // HTTP 监控：method 应为合法 HTTP 方法
      method: 'GET',
      // target 为合法 URL
      target: 'https://lyc8503.net/',
      // tooltip 仅在状态页显示工具提示
      tooltip: 'Primary homepage reachability',
      // statusPageLink 仅用于状态页可点击链接
      statusPageLink: 'https://lyc8503.net/',
      // expectedCodes 不填则默认接受 2xx
      expectedCodes: [200],
      // timeout 毫秒，不填默认为 10000
      timeout: 10000,
    },
    {
      id: 'blog',
      name: 'My Blog',
      method: 'GET',
      target: 'https://250031.xyz/',
      tooltip: 'Blog availability',
      statusPageLink: 'https://250031.xyz/',
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'pan',
      name: 'Clist',
      method: 'GET',
      target: 'https://mengku.qzz.io/',
      tooltip: 'Clist availability',
      statusPageLink: 'https://mengku.qzz.io/',
      expectedCodes: [200],
      timeout: 15000,
    },
    {
      // 备用链接监控：主链接不可用时供用户访问
      id: 'pan_backup',
      name: 'Clist Backup',
      method: 'GET',
      target: 'https://clist.728323532.workers.dev/',
      tooltip: 'Clist 备用访问链路',
      statusPageLink: 'https://clist.728323532.workers.dev/',
      expectedCodes: [200],
      timeout: 15000,
    },
    {
      id: 'libretv',
      name: 'LibreTV',
      method: 'GET',
      target: 'https://tv.mengku.shop/',
      tooltip: 'LibreTV 免费在线视频平台',
      statusPageLink: 'https://tv.mengku.shop/',
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'routerssh',
      name: 'Router SSH',
      // TCP 监控需将 method 设为 TCP_PING
      method: 'TCP_PING',
      // TCP 监控 target 需为 host:port
      target: 'router.example.com:22',
      tooltip: 'Edge router SSH (replace target)',
      timeout: 5000,
    },
    {
      id: 'homelab',
      name: 'HomeLab',
      method: 'TCP_PING',
      target: 'homelab.example.com:22',
      tooltip: 'HomeLab SSH (replace target)',
      timeout: 7000,
    },
    {
      id: 'miscvps',
      name: 'Misc VPS',
      method: 'TCP_PING',
      target: 'vps.example.com:22',
      tooltip: 'Misc VPS SSH (replace target)',
      timeout: 7000,
    },
  ],
  notification: {
    // 通知消息的时区，默认 Etc/GMT
    timeZone: 'Asia/Shanghai',
    // 如需通知，请在此填写 webhook 设置（参考 uptime.config.full.ts）
  },
}

// 你可以在此定义多个维护窗口
// 在维护期间，状态页会显示维护提示
// 同时，相关的故障通知会被跳过（如有）
// 如果不需要该功能，可以保持为空

const maintenances: MaintenanceConfig[] = []

// 不要编辑这一行
export { maintenances, pageConfig, workerConfig }
