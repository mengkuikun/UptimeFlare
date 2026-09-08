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
    '🌐 Public': ['www', 'blog', 'pan', 'sink', 'libretv'],
    '🔐 Private': ['sun_vps'],
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
      name: 'Clist 网盘',
      method: 'GET',
      target: 'https://pan.mengku.shop/',
      tooltip: 'Clist 存储聚合服务',
      statusPageLink: 'https://pan.mengku.shop/',
      expectedCodes: [200],
      timeout: 15000,
    },
    {
      id: 'sink',
      name: 'Sink 短链服务',
      method: 'GET',
      target: 'https://s.mengku.shop/',
      tooltip: 'Sink 现代短链接转发系统',
      statusPageLink: 'https://s.mengku.shop/',
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'libretv',
      name: 'LibreTV',
      method: 'GET',
      target: 'https://tv.mengku.shop/',
      tooltip: 'LibreTV 免费在线视频平台',
      statusPageLink: 'https://tv.mengku.shop/',
      expectedCodes: [200],
      responseKeyword: 'LibreTV',
      timeout: 10000,
    },
    {
      id: 'sun_vps',
      name: '孙-VPS',
      // TCP 监控需将 method 设为 TCP_PING
      method: 'TCP_PING',
      // TCP 监控 target 需为 host:port
      target: '118.31.33.187:22',
      tooltip: '阿里云 VPS SSH 端口连通性',
      timeout: 7000,
    },
  ],
  notification: {
    // 1. 通知消息的时区，默认 Etc/GMT，此处设为北京时间
    timeZone: 'Asia/Shanghai',
    // 2. 告警防抖等待期（分钟）：连续 3 次探测失败（约 3 分钟）才触发报警，过滤公网短暂网络抖动
    gracePeriod: 3,
    // 3. 免告警白名单：开发中的占位服务或未上线服务不触发报警
    skipNotificationIds: ['www'],
    // 4. Webhook 告警渠道配置（支持多渠道数组分发）
    webhook: [
      // 【渠道一：Telegram Bot】
      {
        // Telegram Bot 发送消息接口
        url: 'https://api.telegram.org/bot8998541445:AAFb7QoJYBWcuA9pVy9bj2mzdK-RWZyFbXg/sendMessage',
        method: 'POST',
        payloadType: 'json',
        payload: {
          chat_id: 5058000400,
          text: '$MSG',
        },
        timeout: 10000,
      },
      // 【渠道二（预留备用）：国内微信推送 (如 PushPlus / AstrBot)，需要时解除下方注释即可】
      /*
      {
        url: 'https://www.pushplus.plus/send',
        method: 'POST',
        payloadType: 'json',
        payload: {
          token: '<YOUR_PUSHPLUS_TOKEN>',
          title: 'UptimeFlare 监控告警',
          content: '$MSG',
        },
        timeout: 10000,
      },
      */
    ],
  },
}

// 你可以在此定义多个维护窗口
// 在维护期间，状态页会显示维护提示
// 同时，相关的故障通知会被跳过（如有）
// 如果不需要该功能，可以保持为空

const maintenances: MaintenanceConfig[] = []

// 不要编辑这一行
export { maintenances, pageConfig, workerConfig }
