# 半度温差 · Hugo Book 博客

相拥而立，各自成诗。📖

关于《半度温差》：爱与差异的哲学。这里的文字，是情侣间对生活的温情记录，也是对关系中微妙哲学的探索。我们接受并欣赏彼此那恰到好处的 0.5° 温差，在差异中发现爱意，在思考中温暖彼此。

一个基于 Hugo 与 Book 主题的静态博客，用来记录我们的爱情故事与回忆。

## 起步
- 安装 Hugo（macOS 推荐 Homebrew）：
  - `brew install hugo`
- 本地开发：
  - `hugo server -D -p 8080`
- 构建发布产物到 `docs/`：
  - `hugo -d docs`

## 内容管理
- 新建文章：
  - `hugo new posts/my-post.md`
- 图片与静态资源：
  - 放置在 `static/assets/...`，构建时会复制到发布目录。

## 主题与配置
- 主题：Book（`themes/book`，`hugo.toml:6` 设置 `theme = "book"`）
- 常用参数：
  - `BookTheme = "auto"`
  - `BookToC = true`
  - `BookSearch = true`

### 事件类型说明

| 类型 | 说明 | 图标 | 示例 |
|------|------|------|------|
| `traditional` | 传统节日 | 🎊 | 春节、中秋节、七夕节 |
| `birthday` | 生日庆祝 | 🎂 | 生日派对、生日惊喜 |
| `anniversary` | 纪念日 | 💕 | 恋爱纪念日、特殊日子 |
| `travel` | 旅行足迹 | ✈️ | 旅游、度假、探索 |
| `milestone` | 里程碑 | 🌟 | 重要成就、人生节点 |

### 图片路径规则

```
正确：/assets/images/filename.jpg
错误：/public/assets/images/filename.jpg
错误：./assets/images/filename.jpg
```

## 🎨 主题定制

### 颜色配置

在 `src/styles/main.css` 中修改 CSS 变量：

```css
:root {
  /* 暖调浪漫主题 */
  --warm-bg-primary: #fff1f2;
  --warm-text-primary: #881337;
  
  /* 深色奢华主题 */
  --dark-bg-primary: #0f172a;
  --dark-text-primary: #e2e8f0;
}
```

### Tailwind 颜色

在 `tailwind.config.js` 中扩展颜色：

```javascript
theme: {
  extend: {
    colors: {
      'brand-pink': '#ec4899',
      'brand-purple': '#8b5cf6',
      // 添加更多自定义颜色
    }
  }
}
```

## 项目结构
- `content/` 文章与页面（标准博客文章位于 `content/posts/...`，关于页在 `content/about/_index.md`）
- `layouts/` 模板（使用 Book 主题，无需自定义覆盖）
- `static/` 静态资源与 `CNAME`（例如 `static/assets/images/...`）
- `themes/book/` 主题代码
- `archetypes/default.md` 新建内容模板（`archetypes/default.md:1-8`）
- `hugo.toml` 站点配置（`hugo.toml:1-35`，含 `theme = "book"`、`publishDir = "docs"`）

## 🔧 高级配置

### 网站配置

在 `src/data/events.js` 中修改 `siteConfig`：

```javascript
export const siteConfig = {
  title: "我们的爱情时光",
  subtitle: "爱情的数字化博物馆",
  description: "记录我们共同度过的每一个美好瞬间",
  authors: {
    male: "亲爱的他",
    female: "亲爱的她"
  },
  anniversary: {
    startDate: "2023-03-14",
    startDateLunar: "二月廿三"
  },
  theme: {
    default: "warm", // warm | dark
    allowToggle: true
  }
};
```

### 动画配置

修改 `src/main.js` 中的动画设置：

```javascript
// AOS 配置
this.animations.aos.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 100
});

// GSAP 默认配置
gsap.defaults({
  duration: 0.8,
  ease: "power2.out"
});
```

## 部署
- GitHub Actions 自动部署：`.github/workflows/deploy.yml:27-37`
- 发布目录：`docs/`
- 自定义域名：`lillian.mpoom.cn`（`static/CNAME:1` 与工作流 `cname`）

## 🎯 最佳实践

### 图片优化
- 使用现代图片格式（WebP、AVIF）
- 压缩图片文件大小
- 设置合适的图片尺寸
- 使用 `loading="lazy"` 属性

### 性能优化
- 启用 Gzip 压缩
- 使用 CDN 加速
- 优化字体加载
- 减少 JavaScript 包大小

### SEO 优化
- 设置页面标题和描述
- 添加结构化数据
- 优化图片 alt 属性
- 生成 sitemap

## 🚀 扩展功能

### 可添加的功能
- 评论系统
- 分享功能
- 打印样式
- PWA 支持
- 多语言支持
- 数据备份

### 集成建议
- 后端 API（Node.js、Python）
- 数据库（MongoDB、Firebase）
- 文件存储（OSS、S3）
- 统计分析（Google Analytics）

## 📄 浏览器兼容性

| 浏览器 | 支持版本 |
|--------|----------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### 不支持的功能
- Internet Explorer
- 过旧的移动浏览器

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📜 开源协议

MIT License - 详见 [LICENSE](LICENSE) 文件

## 💝 致谢

感谢所有为这个项目做出贡献的开发者和设计师，特别是：

- [GSAP](https://greensock.com/gsap/) - 专业级动画库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Vite](https://vitejs.dev/) - 极速构建工具
- [AOS](https://michalsnik.github.io/aos/) - 滚动动画库

---

💕 **用技术记录爱情，用代码珍藏回忆** 💕

## 🌟 项目特色

- 💖 **充满爱意的设计** - 温馨浪漫的视觉风格，精致的动画效果
- 📱 **完美响应式** - 适配所有设备，从手机到桌面电脑
- 🎨 **现代化技术栈** - 使用 Tailwind CSS、原生 JavaScript 和现代 HTML5
- ⚡ **易于扩展** - 简单的数据配置，轻松添加新的纪念日
- 🔄 **动态筛选** - 按类型筛选不同的节日和纪念日
- 🖼️ **图片展示** - 优雅的图片画廊和模态框展示

## 🚀 快速开始

### 方法一：直接运行

1. 克隆或下载项目到本地
2. 直接用浏览器打开 `index.html` 文件
3. 开始浏览您的爱情回忆！

### 方法二：本地服务器（推荐）

```bash
# 如果你有 Python
python -m http.server 8000

# 如果你有 Node.js
npx serve .

# 如果你有 PHP
php -S localhost:8000
```

然后在浏览器中访问 `http://localhost:8000`

## 📁 项目结构

```
Lillian/
├── index.html              # 主页面
├── about.html               # 关于页面
├── README.md               # 项目说明文档
├── assets/                 # 静态资源
│   ├── css/
│   │   └── style.css       # 自定义样式
│   ├── js/
│   │   └── script.js       # 主要JavaScript逻辑
│   └── images/             # 图片文件夹（请将图片放在这里）
└── data/
    └── events.js           # 纪念日数据配置文件
```

## 💝 如何添加新的纪念日

这是最重要的部分！添加新纪念日非常简单：

### 步骤1：准备图片

将您的纪念日照片放入 `assets/images/` 文件夹中。推荐使用以下命名规范：

```
assets/images/
├── spring-festival-2024-1.jpg
├── spring-festival-2024-2.jpg
├── birthday-2024.jpg
└── anniversary-2024.jpg
```

### 步骤2：编辑数据文件

打开 `data/events.js` 文件，在 `loveEvents` 数组中添加新的事件对象：

```javascript
const loveEvents = [
  // ... 现有的事件 ...
  
  // 添加您的新纪念日
  {
    id: 9,                                    // 确保ID唯一
    type: 'traditional',                      // 类型：'traditional' | 'birthday' | 'anniversary'
    date: '正月十五',                          // 日期（农历或公历）
    name: '元宵节',                           // 节日名称
    year: '2025',                            // 年份
    title: '我们的元宵节',                     // 这个纪念日的标题
    description: '描述当时的美好回忆...',       // 详细描述
    images: ['lantern-2025-1.jpg', 'lantern-2025-2.jpg'], // 图片文件名数组
    color: 'from-red-300 to-pink-300'        // 卡片渐变色
  }
];
```

### 步骤3：保存并刷新

保存文件后，刷新浏览器即可看到新添加的纪念日！

## 🎨 自定义配置

### 节日类型

支持三种节日类型：

- `traditional` - 传统节日（春节、七夕、中秋等）
- `birthday` - 生日
- `anniversary` - 纪念日（恋爱纪念日、结婚纪念日等）

### 渐变色配置

可用的渐变色选项（Tailwind CSS 类名）：

```javascript
// 粉色系
'from-pink-300 to-rose-300'
'from-rose-300 to-pink-300'

// 紫色系
'from-purple-300 to-indigo-300'
'from-indigo-300 to-purple-300'

// 暖色系
'from-red-300 to-pink-300'
'from-yellow-300 to-orange-300'

// 冷色系
'from-blue-300 to-indigo-300'
'from-green-300 to-teal-300'
```

### 修改网站标题和描述

1. 打开 `index.html` 和 `about.html`
2. 修改 `<title>` 标签中的内容
3. 修改页面中的标题文字

## 🔧 技术栈

- **HTML5** - 语义化的现代HTML结构
- **Tailwind CSS** - 实用优先的CSS框架
- **Vanilla JavaScript** - 原生JavaScript，无依赖
- **Google Fonts** - 优雅的字体（Noto Sans SC、Playfair Display、Dancing Script）

## 📱 响应式特性

网站完美适配：

- 📱 **手机** - 垂直布局，触摸友好的交互
- 📲 **平板** - 优化的中等屏幕布局
- 💻 **桌面** - 完整的双栏时间线布局

## ✨ 功能特性

### 主页功能

- 🎯 **英雄区域** - 震撼的首屏展示
- 📊 **统计信息** - 相伴天数、回忆数量等
- 🔍 **分类筛选** - 按节日类型筛选
- 📱 **移动端菜单** - 响应式导航
- ⬆️ **返回顶部** - 平滑滚动到顶部

### 交互功能

- 🖼️ **图片模态框** - 点击图片查看大图
- 🎭 **平滑动画** - 入场动画和悬停效果
- 📜 **平滑滚动** - 页面内导航平滑滚动
- 🎨 **悬停效果** - 丰富的交互反馈

### 关于页面

- 💕 **爱情故事** - 讲述你们的相遇相知
- 🌟 **网站特色介绍** - 展示网站亮点
- 💝 **感谢页面** - 表达爱意的专页

## 🎯 最佳实践

### 图片优化

- 推荐尺寸：400x300px（4:3比例）
- 格式：JPG 或 PNG
- 大小：每张图片不超过 500KB
- 命名：使用有意义的文件名

### 内容编写

- **标题**：简洁有力，15字以内
- **描述**：真挚动人，50-100字
- **日期**：使用农历或公历，保持一致

## 🚀 部署指南

### GitHub Pages（推荐）

1. 将项目推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 main 分支作为源
4. 访问 `https://你的用户名.github.io/仓库名`

### Netlify

1. 将项目文件夹拖拽到 Netlify
2. 自动部署完成
3. 获得免费的 HTTPS 域名

### Vercel

1. 连接 GitHub 仓库到 Vercel
2. 自动部署和预览
3. 支持自定义域名

## 访问
- `https://lillian.mpoom.cn/`

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

本项目仅供个人使用，请不要用于商业用途。

## 💌 致谢

感谢所有为爱情而努力的人们，愿天下有情人终成眷属！

---

**用心记录，用爱珍藏** ❤️
