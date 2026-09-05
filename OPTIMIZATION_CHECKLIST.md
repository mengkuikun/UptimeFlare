# UptimeFlare 优化与待办事项清单 (Optimization Checklist)

> **使用说明**：
> 本文档记录了 UptimeFlare 监控项目的各项优化建议与实施路线。每当我们协同完成其中的一项，就会将其标记为 `[x] 已完成`，并记录完成时间与对应的 Git 提交节点。

---

## 📊 总体实施进度

- **当前进度**：`3 / 12 项完成`
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

- [ ] **2.1 为 LibreTV 及个人服务添加关键内容校验 (`responseKeyword`)**
  - **位置**：`uptime.config.ts` 中的 `libretv` 监控项
  - **说明**：配置 `responseKeyword: 'LibreTV'`，确保返回不仅是 HTTP 200，而且正文必须含有该关键词，避免反向代理或 CDN 报错页误判为“正常”。
  - **状态**：`待处理`

- [ ] **2.2 设置禁止关键词校验 (`responseForbiddenKeyword`)**
  - **位置**：`uptime.config.ts` 核心监控项
  - **说明**：检测如果页面包含 `Bad Gateway`、`Error 521`、`Database connection failed` 等字样，直接判定为宕机。
  - **状态**：`待处理`

- [ ] **2.3 按需隐藏非必要服务的延迟折线图 (`hideLatencyChart`)**
  - **位置**：`uptime.config.ts` 监控项
  - **说明**：对于仅需判断是否存活的静态资源或备份网盘，可开启 `hideLatencyChart: true` 隐藏波动折线，节省移动端页面空间。
  - **状态**：`待处理`

---

## 阶段三：告警与实时通知落地（优先级：高 🔴）

目标：实现真正的宕机实时报警，随时随地掌握服务运行情况。

- [ ] **3.1 接入 Webhook 告警渠道（Telegram / Bark / 微信 / 飞书）**
  - **位置**：`uptime.config.ts` 中的 `notification.webhook`
  - **说明**：当前未配置任何告警通道。选择一个你日常常用的推送渠道（例如 Telegram Bot、iPhone Bark 极简通知、Server酱或办公群机器人），一旦宕机即时收到通知。
  - **状态**：`待处理`

- [ ] **3.2 配置告警防抖等待期 (`gracePeriod`)**
  - **位置**：`uptime.config.ts` 中的 `notification.gracePeriod`
  - **说明**：设置 `gracePeriod: 3`（分钟），连续探测失败 3 次以上才真正发警报，避免公网瞬时网络抖动引起的误报。
  - **状态**：`待处理`

- [ ] **3.3 配置免告警白名单 (`skipNotificationIds`)**
  - **位置**：`uptime.config.ts` 中的 `notification.skipNotificationIds`
  - **说明**：将正在开发中的占位项（如 `www`）或备用链路加入免告警列表，避免干扰日常使用。
  - **状态**：`待处理`

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
