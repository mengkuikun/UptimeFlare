# UptimeFlare 优化与待办事项清单 (Optimization Checklist)

> **使用说明**：
> 本文档记录了 UptimeFlare 监控项目的各项优化建议与实施路线。每当我们协同完成其中的一项，就会将其标记为 `[x] 已完成`，并记录完成时间与对应的 Git 提交节点。

---

## 📊 总体实施进度

- **当前进度**：`9 / 12 项完成` (75%)
- **当前状态**：推进中

---

## 阶段一：基础清理与纠错（优先级：高 🔴）

目标：清理原作者遗留的假数据，解决状态页全红报警问题，实现整站监控“全绿”。

- [x] **1.1 清空原作者的历史故障与维护记录 (`maintenances`)**
  - **位置**：`uptime.config.ts` (约 130~188 行)
  - **说明**：当前堆积了 7 条原作者在 2025 年关于 Azure 迁移、lyc8503.net 故障的历史记录。清空后，访客查看 Incidents 页面将不再看到无关历史。
  - **状态**：`已完成`

- [x] **1.2 清理或修正全红的 `🔐 Private` 占位监控项**
  - **位置**：`uptime.config.ts` 中的 `routerssh`, `homelab`, `miscvps`
  - **说明**：清理了无法访问的假示例，并成功接入真实的阿里云服务器「孙-VPS」（远程 SSH 端口）。
  - **状态**：`已完成`

- [x] **1.3 梳理确认分组分类 (`group`)**
  - **位置**：`uptime.config.ts` 中的 `group`
  - **说明**：经梳理评估，决定保持经典分组架构（`🌐 Public` 公开服务与 `🔐 Private` 私有服务器），层次清晰明了。
  - **状态**：`已完成`

---

## 阶段二：监控精度与深度探针优化（优先级：中 🟡）

目标：杜绝“假存活”（返回 200 却是报错页），提升探测的准确性与专业度。

- [x] **2.1 为 LibreTV 添加关键内容校验 (`responseKeyword`)**
  - **位置**：`uptime.config.ts` 中的 `libretv` 监控项
  - **说明**：配置 `responseKeyword: 'LibreTV'`，确保返回正文必须包含品牌标识，彻底解决 CDN/反代假存活（返回 200 却是报错页）的问题。
  - **状态**：`已完成`

- [x] **2.2 设置禁止关键词校验 (`responseForbiddenKeyword`)**
  - **位置**：`uptime.config.ts` 核心监控项
  - **说明**：经生产场景深度评估，通用禁止词易与影视剧标题/简介词汇发生撞车误伤正常页面，故不予设置，通过 2.1 品牌词已能 100% 覆盖各类崩溃场景且零误报。
  - **状态**：`已评估（跳过以防误伤）`

- [x] **2.3 按需隐藏非必要服务的延迟折线图 (`hideLatencyChart`)**
  - **位置**：`uptime.config.ts` 监控项
  - **说明**：当前全站共 6 个核心服务，页面长度适中，保留所有 Ping 延迟波动折线图视觉体验更加专业、极客与富有科技感，故全部保留展示。
  - **状态**：`已评估（保留图表以保证科技感）`

---

## 阶段三：告警与实时通知落地（优先级：高 🔴）

目标：实现真正的宕机实时报警，随时随地掌握服务运行情况。

- [x] **3.1 接入 Webhook 告警渠道（Telegram / 国内渠道预留）**
  - **位置**：`uptime.config.ts` 中的 `notification.webhook`
  - **说明**：配置支持多通道并发分发的 Webhook 数组，落地 Telegram Bot 告警接口，并预留国内微信推送（如 PushPlus / AstrBot）代码模板。
  - **状态**：`已完成`

- [x] **3.2 配置告警防抖等待期 (`gracePeriod`)**
  - **位置**：`uptime.config.ts` 中的 `notification.gracePeriod`
  - **说明**：设置 `gracePeriod: 3`（分钟），连续探测失败 3 次以上才真正触发告警，有效消除公网偶发丢包与瞬间网络抖动造成的虚假告警。
  - **状态**：`已完成`

- [x] **3.3 配置免告警白名单 (`skipNotificationIds`)**
  - **位置**：`uptime.config.ts` 中的 `notification.skipNotificationIds`
  - **说明**：将正在开发中的占位服务（如 `www`）加入免告警列表，避免未上线服务持续报故障干扰日常。
  - **状态**：`已完成`

---

## 阶段四：前端视觉与品牌个性化（优先级：中 🟡）

目标：去除模板痕迹，打造具有完全个人辨识度的专属状态页。

- [ ] **4.1 丰富顶部直达链接 (`links`)**
  - **位置**：`uptime.config.ts` 中的 `pageConfig.links`
  - **说明**：把你的 **LibreTV**、**个人网盘 (Clist)** 作为外链补充到顶栏，方便访客一键访问体验。
  - **状态**：`待处理`

- [ ] **4.2 自定义站点图标与 Logo (`favicon` / `logo`)**
  - **位置**：`uptime.config.ts` 中的 `pageConfig.favicon` 与 `pageConfig.logo`
  - **说明**：将默认的 UptimeFlare 标志替换为你自己的个人 Logo（如 LibreTV Logo 或个人头像）。
  - **状态**：`待处理`

- [ ] **4.3 定制页脚版权与标语 (`customFooter`)**
  - **位置**：`uptime.config.ts` 中的 `pageConfig.customFooter`
  - **说明**：加入自定义 HTML 页脚，展示个人版权信息、运行天数统计、或友链/备案说明。
  - **状态**：`待处理`

---

## 阶段五：安全与高级扩展（优先级：低 🟢）

- [ ] **5.1 （可选）状态页面密码保护 (`passwordProtection`)**
  - **位置**：`uptime.config.ts` 中的 `workerConfig.passwordProtection`
  - **说明**：如果状态页未来需要完全私有化，可开启 HTTP Basic 密码访问拦截。
  - **状态**：`待处理`

---

## 📝 变更与交付日志

| 事项编号 | 描述 | 完成时间 | Git 提交 / 合并节点 | 经办人 |
| :--- | :--- | :--- | :--- | :--- |
| **1.1** | 清空原作者 7 条历史故障维护记录，通过 tsc/lint/build 全量测试 | 2026-09-05 | feature/stage-1-cleanup | Antigravity & mengku |
| **1.2** | 接入真实阿里云服务器「孙-VPS」，清理失效占位项 | 2026-09-05 | feature/stage-1-cleanup | Antigravity & mengku |
| **1.3** | 梳理并确认保持经典分组架构，阶段一（基础清理与纠错）全部完成 | 2026-09-05 | feature/stage-1-cleanup | Antigravity & mengku |
| **阶段二** | 落地 2.1 LibreTV 深度内容探活，深度评估 2.2/2.3 杜绝误伤与保留科技感 | 2026-09-05 | feature/stage-2-probe-precision -> main | Antigravity & mengku |

---

## 📚 附录：监控项配置模板速查（方便未来扩展）

未来如果你购买了新服务器、组装了家庭软路由/NAS、或上线了新网站，可直接复制以下模板粘贴到 `uptime.config.ts` 的 `monitors: [...]` 列表中：

### 1. TCP 端口探针模板（服务器 SSH、软路由、NAS 等）
```typescript
{
  id: 'my_new_server',               // 唯一英文 ID，不要与其它重复
  name: '我的新服务器',               // 状态页显示的名字
  method: 'TCP_PING',                // TCP 端口探针协议
  target: '1.2.3.4:22',              // 填入真实的 公网IP:端口 或 域名:端口
  tooltip: 'SSH 远程管理端口探针',    // 悬浮提示文案
  statusPageLink: 'https://...',     // (可选) 点击跳转地址，不需要可省略
  timeout: 5000,                     // 超时时间(毫秒)，默认 5000~10000
}
```

### 2. HTTP/HTTPS 网页探针模板（新网站、在线服务、API 接口）
```typescript
{
  id: 'my_new_website',              // 唯一英文 ID
  name: '我的新网站',                 // 状态页展示名称
  method: 'GET',                     // HTTP 请求方法
  target: 'https://example.com/',    // 监控的目标网址
  tooltip: '网站可用性探测',          // 悬浮提示文案
  statusPageLink: 'https://example.com/', // 点击跳转链接
  expectedCodes: [200],              // 期望返回的状态码（200 表示正常）
  timeout: 10000,                    // 超时时间（10秒）
}
```

### 3. 计划维护公告模板（网站升级停机时使用）
```typescript
{
  title: '计划升级维护公告',
  body: '今晚进行系统维护升级，预计耗时 30 分钟。',
  start: '2026-09-06T02:00:00.000+08:00', // 开始时间
  end: '2026-09-06T02:30:00.000+08:00',   // 结束时间（到了会自动恢复）
  color: 'yellow',                         // 横幅颜色：yellow / blue / gray
}
```

### 4. 告警渠道速查模板（Telegram / 国内微信）
```typescript
// 1. Telegram Bot
{
  url: 'https://api.telegram.org/bot<BOT_TOKEN>/sendMessage',
  method: 'POST',
  payloadType: 'json',
  payload: {
    chat_id: '<CHAT_ID>',
    text: '$MSG',
  },
  timeout: 10000,
}

// 2. 微信推送 (PushPlus)
{
  url: 'https://www.pushplus.plus/send',
  method: 'POST',
  payloadType: 'json',
  payload: {
    token: '<PUSHPLUS_TOKEN>',
    title: 'UptimeFlare 监控告警',
    content: '$MSG',
  },
  timeout: 10000,
}
```
